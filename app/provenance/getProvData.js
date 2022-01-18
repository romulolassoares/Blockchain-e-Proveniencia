const axios = require("axios")

async function getActivityByName(name) {
   url = 'http://127.0.0.1:3333/activity/get/name/' + name
   const response = await axios.get(url)
   return response.data
}

async function getEntityByName(name) {
   url = 'http://127.0.0.1:3333/entity/get/name/' + name
   const response = await axios.get(url)
   return response.data
}

async function getAgentByName(name) {
   url = 'http://127.0.0.1:3333/agent/get/name/' + name
   const response = await axios.get(url)
   return response.data
}


module.exports = {
   getActivityByName,
   getAgentByName,
   getEntityByName,
}