const axios = require('axios');

// const integrate = require('./integrate').getBaseRoute();

async function used(activity, entity) {
   const json = {
      "activity": activity,
      "entity": entity
   };

   const response = await axios.post('https://api-provenance.herokuapp.com/relationships/was-used/post', json)
   console.log(response.data);
}

async function wasGeneratedBy(entity, activity) {
   const json = {
      "activity": activity,
      "entity": entity
   };

   const response = await axios.post('https://api-provenance.herokuapp.com/relationships/was-generated-by/post', json);
   console.log(response.data);
}

async function wasAssociatedWith(activity, agent) {
   const json = {
      "activity": activity,
      "agent": agent
   };

   const response = await axios.post('https://api-provenance.herokuapp.com/relationships/was-associated-with/post', json);
   console.log(response.data);
}

async function wasAttribuitedTo(entity, agent) {
   const json = {
      "agent": agent,
      "entity": entity
   };

   const response = await axios.post('https://api-provenance.herokuapp.com/relationships/was-attribuited-to/post', json);
   console.log(response.data);
}

async function wasInformedBy(activity1, activity2) {
   const json = {
      "activity1": activity1,
      "activity2": activity2
   };

   const response = await axios.post('https://api-provenance.herokuapp.com/relationships/was-informed-by/post', json);
   console.log(response.data);
}

async function wasDerivedFrom(entity1, entity2) {
   const json = {
      "entity1": entity1,
      "entity2": entity2
   };

   const response = await axios.post('https://api-provenance.herokuapp.com/relationships/was-derived-from/post', json);
   console.log(response.data);
}

async function actedOnBehalfOf(agent1, agent2) {
   const json = {
      "agent1": agent1,
      "agent2": agent2
   };

   const response = await axios.post('https://api-provenance.herokuapp.com/relationships/acted-on-behalf-of/post', json);
   console.log(response.data);
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