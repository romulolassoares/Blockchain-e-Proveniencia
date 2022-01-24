const { response } = require('express');
const express = require('express');
const router = express.Router();
const IoTDatabase = require('../app/database/models/IoTModel');

router.get('/', (req, res) =>{
    res.render('iot/index',{
      css: ''
    });
});

router.get('/new', function(req, res) {
   res.render('proArticle/cadastrar',{
       css: ''
   });
});

router.get('/getDocInfo', async (req, res) => {
   // const config = require('../template/printerData/printer01.json');
   const configTemp = require('../template/docData/docs.json');

   const rand = Math.floor(Math.random() * 3) + 1;
   const config = configTemp['value' +  rand];

   const docTitle = config['docTitle'];
   const format = config['format'];
   const author = config['author'];
   const base64 = config['base64']

   const info = {
      "docTitle": docTitle,
      "format": format,
      "author": author,
      "base64": base64,
   }

   res.send(config);
});

module.exports = router;