import pandas as pd
import numpy as np
import json
import logging
import sys
import spacy
import re
import random
from spacy.util import minibatch, compounding
from pathlib import Path
from spacy.gold import GoldParse
import en_core_web_sm

class ModelTrain(object):
    '''data dir - exampledir/,
       num_rep - report number for model trainig'''
    tag_list = ['CVE','CWE','SOFTWARE','MALWARE','COURSE_OF_ACTION',
           'INTRUSION_SET','THREAT_ACTOR','TOOL','ATTACK_PATTERN','MITRE_ATTACK',
            'INDUSTRY','TIMESTAMP','CAMPAIGN','ORG','COUNTRY','CITY',
            'GEOLOCATION','IOC'
           ]
    def __init__(self, data_dir, num_rep):
        self.data_dir = data_dir
        self.num_rep = num_rep
        
    def data_load(self):
        big_list = []
        for i in range(1,int(self.num_rep+1)):
            name = str(self.data_dir)+str(i)+'.txt'
            damp = open(name).read().split('\n')
            damp = [elem  for elem in damp if len(elem)>0]
            big_list.extend(damp)
        return big_list
    
    def data_formatter(self,data_list):
        res_list = []
        for elem in data_list:
            if '(<' or '>)' in elem:
                elem = elem.replace('(<','<')
                elem = elem.replace('>)','>')
            for tag in tag_list:
                tag_start = '<' + tag +'>'
                if tag_start in elem:
                    annotation = {}
                    end_tag = '</'+ tag + '>'
                    label_list = re.findall(tag_start+'(.*?)'+end_tag,elem)
                    if len(label_list) == 1:
                        pos_start = elem.find(label_list[0])
                        pos_end = elem.find(label_list[0]) + len(label_list[0])
                        ent_dict = {}
                        ent_dict['entities'] = [(pos_start+1,pos_end+1,tag)]
                        #elem = elem[0:pos_end] + ' ' + elem[pos_end:]
                        elem = elem[0:pos_start] +' ' +  label_list[0] + ' ' + elem[pos_end:]
                        spacy_sent = (elem,ent_dict)
                        res_list.append(spacy_sent)

                    else:
                        ent_dict = {}
                        ent_dict['entities'] = []
                        for mult_label in label_list:
                                pos_start = elem.find(mult_label)
                                pos_end = elem.find(mult_label) + len(mult_label)
                                ent_dict['entities'].append((pos_start+1,pos_end+1,tag))
                                #elem = elem[0:pos_end] + ' ' + elem[pos_end:]
                                elem = elem[0:pos_start] +' ' +  mult_label + ' ' + elem[pos_end:]
                        res_list.append((elem,ent_dict))
        return res_list
    
    def model_prep(self,TRAIN_DATA,iter_):
        '''TRAIN_DATA - list of tuples for Spacy trainig from data_formatter,
        iter_ - how many iterations you want to train model'''
        #Model Preparation
        nlp_test=spacy.blank("en")
        nlp_test.add_pipe(nlp_test.create_pipe('ner'))
        nlp_test.begin_training()
        ner_test=nlp_test.get_pipe("ner")
        for _, annotations in TRAIN_DATA:
            for ent in annotations.get("entities"):
                ner_test.add_label(ent[2])
        optimizer = nlp_test.resume_training()
        #Model Trainig
        for itn in range(5):
        # shuffle examples before training
            random.shuffle(TRAIN_DATA)
            losses = {}
            for text,ent in TRAIN_DATA:
                content = text
                annot = ent['entities']
                text = nlp_test.make_doc(content)
                if len(annot) != 0:
                    cust_ann = [(annot[0][0],annot[0][1],annot[0][2])] 
                    gold = GoldParse(text,entities = cust_ann)
                    nlp_test.update([text],[gold],sgd=optimizer,losses=losses)
        return nlp_test
    
    def model_save(self,out_dir,model):
        '''output dir - out_dir/'''
        output_dir = Path(out_dir)
        model.to_disk(output_dir)
        

        
    
    