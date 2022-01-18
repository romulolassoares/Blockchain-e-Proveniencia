const { v4: uuidv4 } = require('uuid')
const createProvData = require('../provenance/createProvData')
const getProvData = require('../provenance/getProvData')

async function uploadFile() {
   const docData = require("../../template/docData/docs.json")
   const rand = Math.floor(Math.random() * 3) + 1;
   const config = docData['value' +  rand]

   const nameActivity = "DocGenerated" + config.docTitle
   const pkiActivity = uuidv4();
   const dateActivity = "date"
   const provTypeActivity = "docGenerated"
   await createProvData.registerActivity(nameActivity, pkiActivity, dateActivity, provTypeActivity)
   const activity = await getProvData.getActivityByName(nameActivity)

   const agent = await getProvData.getAgentByName("r01")

   await createProvData.wasAssociatedWith(agent, activity)

   const nameEntity = "entity" + config.docTitle
   const infoEntity = config
   const provTypeEntity = "doc"
   await createProvData.registerEntity(nameEntity, infoEntity, provTypeEntity)
   const entity = await getProvData.getEntityByName(nameEntity)

   console.log("Activity: " + activity['_id'] + " | Entity: " + entity['_id'])


   await createProvData.wasGeneratedBy(activity, entity)

   data = {
      "activity": activity,
      "entity": entity
   }

   return data
}

module.exports = {
   uploadFile,
}