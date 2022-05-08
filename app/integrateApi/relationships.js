const axios = require('axios');

// const integrate = require('./integrate').getBaseRoute();

const provToBlockchain = require('../integrateApi/provToBlockchain')
const convertJWT = require('../controller/convertJWT')

const baseURL = "https://api-provenance.herokuapp.com";
// const baseURL = "http://localhost:3333";

async function used(activity, entity, userPki) {
   const json = {
      "activity": activity,
      "entity": entity
   };

   const response = await axios.post(baseURL + '/relationships/was-used/post', json)
   console.log(response.data);
   
   const data = {
      "node1": await convertJWT.handle(activity),
      "node2": await convertJWT.handle(entity),
      "relationship": "WAS_USED"
   }
   await provToBlockchain.singleData(userPki, data)
}

async function wasGeneratedBy(entity, activity, userPki) {
   const json = {
      "activity": activity,
      "entity": entity
   };

   const response = await axios.post(baseURL + '/relationships/was-generated-by/post', json);
   console.log(response.data);
   
   const data = {
      "node1": await  convertJWT.handle(activity),
      "node2": await  convertJWT.handle(entity),
      "relationship": "WAS_GENERATED_BY"
   }
   await provToBlockchain.singleData(userPki, data)
}

async function wasAssociatedWith(activity, agent, userPki) {
   const json = {
      "activity": activity,
      "agent": agent
   };

   // console.log(json)

   const response = await axios.post(baseURL + '/relationships/was-associated-with/post', json)
   console.log(response.data);

   const data = {
      "node1": await convertJWT.handle(activity),
      "node2": await convertJWT.handle(agent),
      "relationship": "WAS_ASSOCIATED_WITH"
   }
   await provToBlockchain.singleData(userPki, data)

}

async function wasAttribuitedTo(entity, agent, userPki) {
   const json = {
      "agent": agent,
      "entity": entity
   };

   const response = await axios.post(baseURL + '/relationships/was-attribuited-to/post', json);
   console.log(response.data);
   
   const data = {
      "node1": await  convertJWT.handle(agent),
      "node2": await  convertJWT.handle(entity),
      "relationship": "WAS_ATTRIBUITED_TO"
   }
   await provToBlockchain.singleData(userPki, data)
}

async function wasInformedBy(activity1, activity2, userPki) {
   const json = {
      "activity1": activity1,
      "activity2": activity2
   };

   const response = await axios.post(baseURL + '/relationships/was-informed-by/post', json);
   console.log(response.data);
   
   const data = {
      "node1": await  convertJWT.handle(activity1),
      "node2": await  convertJWT.handle(activity2),
      "relationship": "WAS_INFORMED_BY"
   }
   await provToBlockchain.singleData(userPki, data)
}

async function wasDerivedFrom(entity1, entity2, userPki) {
   const json = {
      "entity1": entity1,
      "entity2": entity2
   };

   const response = await axios.post(baseURL + '/relationships/was-derived-from/post', json);
   console.log(response.data);
   
   const data = {
      "node1": await  convertJWT.handle(entity1),
      "node2": await  convertJWT.handle(entity2),
      "relationship": "WAS_DERIVED_FROM"
   }
   await provToBlockchain.singleData(userPki, data)
}

async function actedOnBehalfOf(agent1, agent2, userPki) {
   const json = {
      "agent1": agent1,
      "agent2": agent2
   };

   const response = await axios.post(baseURL + '/relationships/acted-on-behalf-of/post', json);
   console.log(response.data);
   
   const data = {
      "node1": await  convertJWT.handle(agent1),
      "node2": await  convertJWT.handle(agent2),
      "relationship": ""
   }
   await provToBlockchain.singleData(userPki, data)
}

module.exports = {
   used,
   wasGeneratedBy,
   wasAssociatedWith,
   wasAttribuitedTo,
   wasInformedBy,
   wasDerivedFrom,
   actedOnBehalfOf
}