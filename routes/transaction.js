const { response } = require('express');
const express = require('express');
const router = express.Router();
const IoTDatabase = require('../app/database/models/IoTModel');
const LogDatabase = require('../app/database/models/LogModel');
const { v4: uuidv4 } = require('uuid');

const invoke = require('../app/transaction/invoke')
const query = require('../app/transaction/query')

const RedeDatabase = require('../app/database/models/RedeModel')
const UserDatabase = require('../app/database/models/UserModel')

router.get('/', function(req, res) {
    res.render('transaction/index',{
        css: ''
    });
});

router.get('/new', function(req, res) {
    res.render('transaction/cadastrar',{
        css: ''
    });
});

router.post('/save', async (req, res) => {
    const { userPki, iotPki, task, printBrand, printMaterial, printColor, printLabel, printGUID, printDestiny, printDiameter,  } = req.body;
    const transactionID = uuidv4();
    const provenanceID = uuidv4();
    const timestamp = Date.now();

    const infoPrint = {
        "name": {
            "brand": printBrand,
            "material": printMaterial,
            "color": printColor,
            "label": printLabel
        },
        "GUID": printGUID,
        "properties": {
            "density": printDestiny,
            "diameter": printDiameter
        }
     };

    console.log(infoPrint);

    var resultIoT = await IoTDatabase.findOne({pki: iotPki, operacao: task});

    if(resultIoT === null){
        const status = "iot/task not find"

        const logDatabase = new LogDatabase({
            transactionID: transactionID,
            userPki: userPki,
            iotPki: iotPki,
            task: task,
            timestamp: timestamp,
            status: status
        })

        await logDatabase.save();        
        res.redirect('/transaction?msg=iottaskerror');
    
    } else {

        const rede = await RedeDatabase.findOne({
            isOnline: true
        })
    
        var antes = Date.now();
        if(rede) {
            var resultTransaction = await invoke.saveTransaction(transactionID, userPki, iotPki, task, JSON.stringify(infoPrint), timestamp, rede);
        } else {
            console.log("Nenhuma rede iniciada!!!!")
            resultado = 3
        }
        
        var duracao = Date.now() - antes;
        console.log("levou " + duracao + "ms");

        if(resultTransaction == 1){
            const status = "success"

            const logDatabase = new LogDatabase({
                transactionID: transactionID,
                userPki: userPki,
                iotPki: iotPki,
                task: task,
                timestamp: timestamp,
                status: status
            })

            infoProv = await registerProv.register(userPki,transactionID, task);

            await invoke.saveProv(provenanceID, userPki, JSON.stringify(infoProv), rede);

            await logDatabase.save();
            res.redirect('/transaction?msg=success');

        } else if(resultTransaction == 2){   
            const status = "invalid user"

            const logDatabase = new LogDatabase({
                transactionID: transactionID,
                userPki: userPki,
                iotPki: iotPki,
                task: task,
                timestamp: timestamp,
                status: status
            })
    
            await logDatabase.save();

            res.redirect('/transaction?msg=usererror');

        } else if(resultTransaction == 3){   
            const status = "internal error"

            const logDatabase = new LogDatabase({
                transactionID: transactionID,
                userPki: userPki,
                iotPki: iotPki,
                task: task,
                timestamp: timestamp,
                status: status
            })
    
            await logDatabase.save();
            
            res.redirect('/transaction?msg=internalerror');
        } 
    }
});

router.get('/get', function(req, res) {
    res.render('transaction/listar',{
        css: ''
    });
});

router.get('/getTransactions', async (req, res) => {
    res.send(await LogDatabase.find());
});

router.get('/list', function(req, res) {
    res.render('transaction/listType',{
        css: ''
    });
});

router.get('/listTransactions', async (req, res) => {
    // const { userPki, iotPki, task, printBrand, printMaterial, printColor, printLabel, printGUID, printDestiny, printDiameter,  } = req.body;
    var userPki = "r01"

    var resultUser = await UserDatabase.findOne({ pki: userPki });
    // console.log(resultUser);

    if(resultUser === null){
        const status = "user not find"
       
        res.send("error");
    
    } else {

        const rede = await RedeDatabase.findOne({
            isOnline: true
        })
        var resultProvData = "{}";
        var antes = Date.now();
        console.log(rede)
        if(rede) {
            resultProvData = await query.getAllData(resultUser, rede);
        } else {
            console.log("Nenhuma rede iniciada!!!!")
            resultado = 3
        }
        
        var duracao = Date.now() - antes;
        console.log("levou " + duracao + "ms");

        console.log(resultProvData)
        var provJson = JSON.parse(resultProvData);
        res.send(provJson);
    }
});

router.get('/getPrinterInfo', async (req, res) => {
    // const config = require('../template/printerData/printer01.json');
    const configTemp = require('../template/printerData/printer.json');

    const rand = Math.floor(Math.random() * 3) + 1;
    const config = configTemp['value' +  rand]

    // // Call update file ----------------------------------------------------
    // fakeUpload.uploadFile()
    // Generate Activity DocGenerated -> registerActivity()
    // Generate Doc Info -> registerEntity("docEntity", infoDoc, "doc")

    const printBrand = config['name']['brand'];
    const printMaterial = config['name']['material'];
    const printColor = config['name']['color'];
    const printLabel = config['name']['label'];
    const printGUID = config['GUID'];
    const printDesity = config['properties']['density'];
    const printDiameter = config['properties']['diameter'];

    const info = {
        "brand": printBrand,
        "material": printMaterial,
        "color": printColor,
        "label": printLabel,
        "GUId": printGUID,
        "density": printDesity,
        "diameter": printDiameter
     }

    // createProvData.registerEntity("printEntity", info, "print");
    // console.log(config);
    res.send(config);
});


  
module.exports = router;