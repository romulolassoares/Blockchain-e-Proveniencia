const { response } = require('express');
const express = require('express');
const router = express.Router();
const IoTDatabase = require('../app/database/models/IoTModel');
const LogDatabase = require('../app/database/models/LogModel');
const { v4: uuidv4 } = require('uuid');

const invoke = require('../app/transaction/invoke')
const query = require('../app/transaction/query')

const RedeDatabase = require('../app/database/models/RedeModel')
const UserDatabase = require('../app/database/models/UserModel')

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
   const val = req.query.value

   const configTemp = require('../template/docData/docs.json');

   const config = {
      title: val,
      data: configTemp[val]
   }

   res.send(config);
});

router.get('/convertBase', async (req, res) => {
   const val = req.query.value

   const configTemp = require('../template/docData/docs.json');

   const config = {
      title: val,
      base: configTemp[val]["base64"]
   }

   res.send(config);
});

router.get('/getDocs', async (req, res) => {
   const json_data = require('../template/docData/docs.json');

   var result = [];
   var x = 0;
   for(var i in json_data){
      result.push([i, json_data[i]]);
      x++;
   }
   res.send(result);
});

router.post('/save', async (req, res) => {
   const { userPki, companyOrigin, companyDestination, documentTitle, documentFormat, documentAuthor, documentBase64 } = req.body;
   const transactionID = uuidv4();
   const provenanceID = uuidv4();
   const timestamp = Date.now();

   const documentJSON = {
      "title": documentTitle,
      "author": documentAuthor,
      "format": documentFormat,
      "base64": documentBase64
   }
   const document = JSON.stringify(documentJSON);
   const requisition = "Send Document"

   var resultCompanyDestination = await UserDatabase.findOne({ pki: companyDestination})

   if(resultCompanyDestination === null){
      const status = "Company Destination not find"

      console.log(status); 
      res.redirect('/transaction?msg=iottaskerror');
   
   } else {
      // Find a online network
      const rede = await RedeDatabase.findOne({
         isOnline: true
      })
      
      var antes = Date.now(); // Start Time
      
      if(rede) {
         var resultTransaction = await invoke.saveProArticle(transactionID, companyOrigin, companyDestination, document, requisition, rede);
      } else {
         console.log("Nenhuma rede iniciada!!!!")
         resultado = 3
      }
      
       var duracao = Date.now() - antes; // End Time
       console.log("levou " + duracao + "ms");

      if(resultTransaction == 1){ // Success
         const status = "success"

         console.log(status);
         res.redirect('/transaction?msg=success');

      } else if(resultTransaction == 2){   
         const status = "invalid user"

         console.log(status);

         res.redirect('/transaction?msg=usererror');

      } else if(resultTransaction == 3){   
         const status = "internal error"

         console.log(status);
         
         res.redirect('/transaction?msg=internalerror');
      } 
   }
});

module.exports = router;