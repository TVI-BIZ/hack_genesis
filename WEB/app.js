const express = require("express");
const cors = require("cors");
const multer  = require("multer");
var pyshell =  require('python-shell');
var fs = require("fs");
  
const app = express();
app.use(cors());

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "hack_genesis");
    },
    filename: (req, file, cb) =>{
        cb(null, "test_4.txt");
    }
});
  
app.use(express.static(__dirname));
app.use(multer({storage:storageConfig}).single("file"));

app.post("/api/upload_document", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        console.log("Файл загружен");
        pyshell.PythonShell.run('hack_genesis/eval.py', null, function  (err, results)  {
            if  (err)  throw err;
            console.log('hack_genesis/eval.py finished.');
            console.log('results', results);
        });
        console.log("Питон отработал")
        var obj = JSON.parse(fs.readFileSync('tag_lists.json', 'utf8'));
        console.log(obj);
        res.send(obj);
});

app.listen(8080);

