var express = require('express');
var router = express.Router();

const axios = require('axios')

const api = axios .create({
   baseUrl: 'https://127.0.0.1:3333/',
})

router.get('/get_all_activities', async function(req, res, next){
   const message = ""

   axios({
      method: 'get',
      url: 'http://127.0.0.1:3333/activity/',
      responseType: 'json'
    }).then(function (response) {
       console.log(response.data)
       res.send(response.data)
   });
})

router.get('/get_all_agents', async function(req, res, next){
   const message = ""

   axios({
      method: 'get',
      url: 'http://127.0.0.1:3333/agent/',
      responseType: 'json'
    }).then(function (response) {
       console.log(response.data)
       res.send(response.data)
   });
})

router.get('/get_all_entities', async function(req, res, next){
   const message = ""

   axios({
      method: 'get',
      url: 'http://127.0.0.1:3333/entity/',
      responseType: 'json'
    }).then(function (response) {
       console.log(response.data)
       res.send(response.data)
   });
})

router.get('/get_all_prov_data', async function(req, res, next){
   const message = ""

   axios({
      method: 'get',
      url: 'http://127.0.0.1:3333/prov/get/61b3982a936b45ab3537e47f',
      responseType: 'json'
    }).then(function (response) {
       console.log(response.data)
       res.send(response.data)
   });
})

router.get('/index', function(req, res, next){
   res.render('api/index', {
      css: ''
   });
})

module.exports = router;
