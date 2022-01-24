// const { response } = require('express');
// const express = require('express');
// const router = express.Router();
// const IoTDatabase = require('../app/database/models/IoTModel');
// const LogDatabase = require('../app/database/models/LogModel');
// const { v4: uuidv4 } = require('uuid');

// const invoke = require('../app/transaction/invoke')
// const query = require('../app/transaction/query')

// const RedeDatabase = require('../app/database/models/RedeModel')
// const UserDatabase = require('../app/database/models/UserModel')
// const registerProv = require('../app/provenance/registerData')

const createProvData = require('./createProvData')
const getProvData = require('./getProvData')

const fakeUpload = require('../controller/fakeUploadFile')


async function createRelationshipTransactionSimulation(nameActivity, userPki, infoPrint) {
   const activity = await getProvData.getActivityByName(nameActivity)
         
   const agent = await getProvData.getAgentByName(userPki)

   await createProvData.wasAssociatedWith(agent, activity)
   // create relathionships here?

   // Call update file ----------------------------------------------------
   const dataReturn = await fakeUpload.uploadFile()
   const activityDoc = dataReturn.activity
   const entityDoc = dataReturn.entity

   await createProvData.wasInformedBy(activityDoc, activity)

   let n = (Math.random() * 0xfffff * 1000000).toString(16);
   const printEntityID = n.slice(0,6);

   const namePrintEntity = "printEntity" + printEntityID;
   const provTypePrintEntity = "print";
   await createProvData.registerEntity(namePrintEntity, infoPrint, provTypePrintEntity);

   const entityPrint = await getProvData.getEntityByName(namePrintEntity);

   await createProvData.wasGeneratedBy(activity, entityPrint);

   await createProvData.wasUsed(activity, entityPrint);

   await createProvData.wasDerivedFrom(entityDoc, entityPrint);

   // Finished
}


module.exports = {
   createRelationshipTransactionSimulation
}