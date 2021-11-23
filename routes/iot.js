const { response } = require('express');
const express = require('express');
const router = express.Router();
const IoTDatabase = require('../app/database/models/IoTModel');

router.get('/', (req, res) =>{
    res.render('iot/index',{
      css: ''
    });
});

router.get('/new', (req, res) =>{
  res.render('iot/cadastrar',{
    css: ''
  });
});

router.post('/save', async (req, res) => {
  const {nome, descricao, tipo, pki, operacao} = req.body;

  const ioTDatabase = new IoTDatabase({
    nome: nome,
    descricao: descricao,
    tipo: tipo,
    pki: pki,
    operacao: operacao
  })

  await ioTDatabase.save(); 
  res.redirect('/iot/get');
  
  
});

router.get('/get', (req, res) => {
  res.render('iot/listar',{
    css: ''
  });
});

router.get('/getIoTs', async (req, res) => {
  res.send(await IoTDatabase.find());
});

module.exports = router;