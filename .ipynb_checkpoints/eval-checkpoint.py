from pathlib import Path
import spacy
import json

class EvalModel(object):
    def __init__(self, load_dir):
        self.load_dir = load_dir
        
    def load_model(self):
        output_dir = Path(self.load_dir)
        print("Loading from Dir", output_dir)
        model = spacy.load(output_dir)
        return model
        
    def eval_model(self,file_path,model):
        '''file_path incliding the filename'''
        preds = open(file_path).read().split('\n')
        preds = [elem  for elem in preds  if len(elem)>0]
        pred_list = []
        for sent in preds:
            doc = model(sent)
            if len(doc.ents) != 0:
                for elem in doc.ents:
                    pred_list.append((elem.text,elem.label_))
        return pred_list
    
#class=EvalModel('models/')
#model=class.load_model
#tag_list=eval_model('test_4.txt',model)

if __name__ == '__main__':
    class_=EvalModel('models/')
    model = class_.load_model() 
    tag_list = class_.eval_model('test_4.txt',model)
    with open('tag_lists.json','w') as f:
        json.dump(tag_list,f)