
const express = require('express');
const app = express();
const {generateFiles} = require('./services/generateFiles')
const fs = require('fs');


app.use(express.json());

app.get('/', (req,res)=>{
    fs.readFile('./perfilesaire.txt', (err, data)=>{
        if(err){
            return console.error(err);
        }
        const file = new generateFiles(data.toString());
        res.send(file.splitFile());
    });
});


app.listen(3000, ()=>{
    console.log('Server listen at https://localhost:3000');
})
