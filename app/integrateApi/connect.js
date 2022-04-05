const axios = require('axios');

const api = axios.create({
   baseURL: 'https://api-provenance.herokuapp.com',
   headers: {
      'Content-Type': 'application/json'
   }
});

module.export = api;
