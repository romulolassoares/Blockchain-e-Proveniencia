const provenanceData = require('./provenanceData');
const RedeDatabase = require('../database/models/RedeModel');
const invoke = require('../transaction/invoke');
const { v4: uuidv4 } = require('uuid');

async function save(userPki, node1, node2, relationship) {
   const transactionID = uuidv4();
   // Find a online network
   const rede = await RedeDatabase.findOne({
      isOnline: true
   })

   var antes = Date.now(); // Start Time
   if(rede) {
      var resultTransaction = await invoke.saveProv(transactionID, userPki, node1, node2, relationship, rede);
   } else {
      console.log("Nenhuma rede iniciada!!!!")
      resultado = 3
   }
   var depois = Date.now()
   var duracao = depois - antes; // End Time
   console.log("levou " + duracao + "ms");

   if(resultTransaction == 1){ // Success
      const status = "success"

      console.log(status);
      // res.redirect('/transaction?msg=success');

   } else if(resultTransaction == 2){   
      const status = "invalid user"

      console.log(status);

      // res.redirect('/transaction?msg=usererror');

   } else if(resultTransaction == 3){   
      const status = "internal error"

      console.log(status);
      
      // res.redirect('/transaction?msg=internalerror');
   } 

}




async function provenanceToBlockchain(userPki) {
   console.log("Save Data from DB")
   const data = await provenanceData.getAllData();
   console.log(data);
   for(val in data) {
      await save(userPki, data[val]["node1"], data[val]["node2"], data[val]["relationship"]);
   }
}

async function singleData(userPki, data) {
   await save(userPki, data["node1"], data["node2"], data["relationship"]);
}

module.exports = {
   provenanceToBlockchain,
   singleData,
}