const axios = require("axios")

async function registerActivity(name, pki, date, provType) {
   const data = {
      "name": name,
      "provType": provType,
      "info": {
         "pki": pki,
         "date": date
      }
   }

   await axios.post('http://127.0.0.1:3333/activity/post', data)
   .then((res) => {
      // console.log(res.data)
   }, (error) => {
      // console.log(error)
   })

   // res.status(201).json(user)
}

async function registerAgent(name, pki, provType) {
   const data = {
      "name": name,
      "provType": provType,
      "pki": pki
   };

   await axios.post('http://127.0.0.1:3333/agent/post', data)
   .then((res) => {
      console.log(res.data)
   }, (error) => {
      // console.log(error.data)
   })

}

async function registerEntity(name, info, provType) {
   const data = {
      "name": name,
      "provType": provType,
      "info": info
   }

   await axios.post('http://127.0.0.1:3333/entity/post', data)
   .then((res) => {
      // console.log(res.data)
   }, (error) => {
      console.log(error.response.data)
   })
}

async function wasUsed(activity, entity) {
   const idActivity = activity['_id']
   const idEntity = entity['_id']
   await axios.post('http://127.0.0.1:3333/relationship/was_used/' + idActivity + "&" + idEntity )
   .then((res) => {
      console.log(res.data)
      return res.data
   }, (error) => {
      // console.log(error)
   })
}

async function wasGeneratedBy(activity, entity) {
   const idActivity = activity['_id']
   const idEntity = entity['_id']
   await axios.post('http://127.0.0.1:3333/relationship/was_generated_by/' + idActivity + "&" + idEntity )
   .then((res) => {
      console.log(res.data)
      return res.data
   }, (error) => {
      // console.log(error)
   })
}

async function wasAttribuitedTo() {}

async function wasAssociatedWith(agent, activity) {
   const idActivity = activity['_id']
   const idAgent = agent['_id']
   await axios.post('http://127.0.0.1:3333/relationship/was_associated_with/' + idAgent + "&" + idActivity  )
   .then((res) => {
      console.log(res.data)
      return res.data
   }, (error) => {
      console.log(error)
   })
}

async function wasDerivedFrom(entity1, entity2) {
   const idEntity1 = entity1['_id']
   const idEntity2 = entity2['_id']
   await axios.post('http://127.0.0.1:3333/relationship/was_derived_from/' + idEntity1 + "&" + idEntity2)
   .then((res) => {
      console.log(res.data)
      return res.data
   }, (error) => {
      console.log(error)
   })
}

async function actedOnBehalfOf() {}

async function wasInformedBy(activity1, activity2) {
   const idActivity1 = activity1['_id']
   const idActivity2 = activity2['_id']
   await axios.post('http://127.0.0.1:3333/relationship/was_informed_by/' + idActivity1 + "&" + idActivity2  )
   .then((res) => {
      console.log(res.data)
      return res.data
   }, (error) => {
      console.log(error)
   })
}


module.exports = {
   registerAgent,
   registerActivity,
   registerEntity,
   wasGeneratedBy,
   wasAssociatedWith,
   wasInformedBy,
   wasUsed,
   wasDerivedFrom,
}