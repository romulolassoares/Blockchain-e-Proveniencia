const axios = require('axios');

// const api = require('./connect');

// const api = connection.getApi();
const baseURL = 'https://api-provenance.herokuapp.com'

async function getBaseRoute() {
   const response = await axios.get(baseURL + '/');
   console.log(response.data.routes.relationships);
   const relationships = response.data.routes.relationships;
   return relationships.posts
}

module.exports = {
   getBaseRoute
}