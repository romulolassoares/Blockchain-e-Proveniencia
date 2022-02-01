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
const registerProv = require('../app/provenance/registerData')

const createProvData = require('../app/provenance/createProvData')
const getProvData = require('../app/provenance/getProvData')
const makeProv = require('../app/provenance/makeProv')

const fakeUpload = require('../app/controller/fakeUploadFile')


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

      //  const logDatabase = new LogDatabase({
      //      transactionID: transactionID,
      //      userPki: userPki,
      //      iotPki: iotPki,
      //      task: task,
      //      timestamp: timestamp,
      //      status: status
      //  })

      //  await logDatabase.save();   
      conole.log(status); 
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

         // const logDatabase = new LogDatabase({
         //       transactionID: transactionID,
         //       userPki: userPki,
         //       iotPki: iotPki,
         //       task: task,
         //       timestamp: timestamp,
         //       status: status
         // })

         // infoProv = await registerProv.register(userPki,transactionID, task);

         // await invoke.saveProv(provenanceID, userPki, JSON.stringify(infoProv), rede);

         // Provenace Capture new activity
         // const nameActivity = "transaction"+transactionID
         // const pkiActivity = transactionID;
         // const dateActivity = "date"
         // const provTypeActivity = "transaction"
         // await createProvData.registerActivity(nameActivity, pkiActivity, dateActivity, provTypeActivity)

         // await makeProv.createRelationshipTransactionSimulation(nameActivity, userPki, infoPrint)

         // await logDatabase.save();
         console.log(status);
         res.redirect('/transaction?msg=success');

      } else if(resultTransaction == 2){   
         const status = "invalid user"

         // const logDatabase = new LogDatabase({
         //    transactionID: transactionID,
         //    userPki: userPki,
         //    iotPki: iotPki,
         //    task: task,
         //    timestamp: timestamp,
         //    status: status
         // })

         // await logDatabase.save();
         console.log(status);

         res.redirect('/transaction?msg=usererror');

      } else if(resultTransaction == 3){   
         const status = "internal error"

         // const logDatabase = new LogDatabase({
         //    transactionID: transactionID,
         //    userPki: userPki,
         //    iotPki: iotPki,
         //    task: task,
         //    timestamp: timestamp,
         //    status: status
         // })

         // await logDatabase.save();
         console.log(status);
         
         res.redirect('/transaction?msg=internalerror');
      } 
   }
});

module.exports = router;