const { response } = require('express');
const express = require('express');
const router = express.Router();
const IoTDatabase = require('../app/database/models/IoTModel');
const ProvDatabase = require('../app/database/models/provenance/provModel');
const { v4: uuidv4 } = require('uuid');
const invoke = require('../app/transaction/invoke')
const RedeDatabase = require('../app/database/models/RedeModel')

const registerProv = require('../app/provenance/registerData')

router.get('/get', function(req, res) {
    res.render('prov/listar',{
        css: ''
    });
});

router.get('/getTransactions', async (req, res) => {
    res.send(await ProvDatabase.find());
});

router.get('/routeGetProvById/:id', async (req, res) => {
    const provdatase = await ProvDatabase.findById(req.params.id);
    res.send(provdatase);
});
  

module.exports = router;