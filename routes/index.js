var express = require('express');
var router = express.Router();
const mongodb = require('../app/database/mongodb/Server')

const integrateApi = require('../app/integrateApi/relationships')

/* GET home page. */
router.get('/', function(req, res, next) {
  // integrateApi.used();
  // integrateApi.wasGeneratedBy();
  // integrateApi.wasAssociatedWith();
  // integrateApi.wasAttribuitedTo();
  // integrateApi.wasInformedBy();
  // integrateApi.wasDerivedFrom();
  // integrateApi.actedOnBehalfOf();
  res.render('index',{
    css: ''
  });
});

router.get('/cadastrarRede', function(req, res, next) {
  res.render('rede/cadastrarRede',{
    css: ''
  });
});

router.get('/listarRedes', function(req, res, next) {
  res.render('rede/listarRedes',{
    css: ''
  });
});

router.get('/result', function(req, res, next) {
  res.render('results/result',{
    css: ''
  });
});

router.get('/resultDelete', function(req, res, next) {
  res.render('results/resultDelete',{
    css: ''
  });
});


module.exports = router;
