const express = require('express');
const router = express.Router();
const createNetwork = require('../app/controller/createNetwork')
const rimraf = require("rimraf");
const path = require('path');
const RedeDatabase = require('../app/database/models/RedeModel')
const UserDatabase = require('../app/database/models/UserModel')
const enrollAdmin = require('../app/transaction/enrollAdmin')
const registerUser = require('../app/transaction/registerUser')


///////////////////////////////////////////////////////////////////////////////////////////
//CRUD REDE
///////////////////////////////////////////////////////////////////////////////////////////
router.post('/routeCreateNetwork', async (req, res) => {
    
    console.log(req.body);

    const verify = await createNetwork.verifyNetworkName(req,res);
    if (String(verify) === "exist") {
        res.redirect('/result?msg=existFile');
    } else {
        if (req.body != null) {
            createNetwork.creatAndSave(req, res);
            const {nomeRede, descricaoRede, nomeOrg, numPeer, nomeCanal} = req.body

            let orgList =[]

            let Org ={
                "nomeOrg":"",
                "numPeer":""
            }

            for(let i =0; i<nomeOrg.length; i++){
                Org={nomeOrg:nomeOrg[i], numPeer:numPeer[i]}
                orgList.push(Org)
            }

            const redeDatabase = new RedeDatabase({
                nomeRede: nomeRede,
                descricaoRede: descricaoRede,
                nomeOrg: nomeOrg,
                numPeer: numPeer,
                nomeCanal: nomeCanal,
                Org: orgList
            })
    
            const newredeDatabase = await redeDatabase.save()
                  
            res.redirect('/result?msg=success');
        } else {
            res.redirect('/result?msg=error');
        }
    }
});

router.get('/routeGetNetwork', async (req, res)=>{
    const rededatabase = await RedeDatabase.find()
    res.send(rededatabase);
});

router.get('/routeGetNetworkById/:id', async (req, res)=>{
    const rededatabase = await RedeDatabase.findById(req.params.id)
    res.send(rededatabase);
});

router.post('/routeDeleteNetwork', async (req, res)=>{
     
    idRede = req.body.idRede 
    networkName = req.body.nomeRede 

    // const rede = await RedeDatabase.findOne({
    //     isOnline: true
    //  })

    const networks = path.join(process.cwd(), 'networks');
    const pathNetwork = networks + '/' + networkName;

    rimraf(pathNetwork, function () {
        console.log("Network deleted!"); 
    });

    query = {
        "network": idRede,
    }
    UserDatabase.deleteMany(query, function (err) {
        if(err) console.log(err);
    })
    console.log("Users from network delete from database"); 
    // var dbo = db.db("mydb");
    // var myquery = { address: /^O/ };
    // dbo.collection("customers").deleteMany(myquery, function(err, obj) {
    //     if (err) throw err;
    //     console.log(obj.result.n + " document(s) deleted");
    //     db.close();
    // });

    RedeDatabase.findByIdAndDelete(idRede, function (err) {
        if (err) res.redirect('/resultDelete?msg=error');
            res.redirect('/resultDelete?msg=success');     
    });


    
});




///////////////////////////////////////////////////////////////////////////////////////////
//OPERAÇÕES REDE
///////////////////////////////////////////////////////////////////////////////////////////

// Iniciar a rede
router.get('/routeStartNetwork/:id', async (req, res)=>{
    const rededatabase = await RedeDatabase.findById(req.params.id)
    res.send(rededatabase);
    createNetwork.startNetwork(rededatabase);
    RedeDatabase.updateOne({_id: rededatabase._id}, {
        $set: {
            isOnline: true,
        }
    }, (err, result) => {
        if(err) return res.send(err)
        console.log("Atualizado")
    })
});

// Parar a rede
router.get('/routeStopNetwork/:id', async (req, res)=>{
    const rededatabase = await RedeDatabase.findById(req.params.id)
    res.send(rededatabase);
    createNetwork.stopNetwork(rededatabase);
    RedeDatabase.updateOne({_id: rededatabase._id}, {
        $set: {
            isOnline: false,
        }
    }, (err, result) => {
        if(err) return res.send(err)
        console.log("Atualizado")
    })
});

// Instalar chaincode
router.get('/routeInstallChaincode/:id', async (req, res)=>{
    const rededatabase = await RedeDatabase.findById(req.params.id)
    res.send(rededatabase);
    createNetwork.deployCC(rededatabase);
});



router.get('/enrollAdmin', async (req, res)=>{
    
    resultado = 0

    const rede = await RedeDatabase.findOne({
        isOnline: true
    })

    // console.log(rede)

    if(rede) {
        resultado = await enrollAdmin.enrollAdmin(rede);
    } else {
        console.log("Nenhuma rede iniciada!!!!")
        resultado = 3
    }

    if(resultado == 1){
        res.send(JSON.parse('{ "result":"success"}'));
    }else if(resultado == 2){
        res.send(JSON.parse('{ "result":"exists"}'));
    }else if(resultado == 3){
        res.send(JSON.parse('{ "result":"error"}'));
    }
});

router.get('/cadastrarUsuario', (req, res)=>{
    res.render('cadastrarUsuario',{
        css: ''
      });
});

router.get('/cadastrarAdmin', (req, res)=>{
    res.render('admin/cadastrarAdmin',{
        css: ''
      });
});

router.get('/registerUser/:nome', async (req, res)=>{
    
    nomeUsuario = req.params.nome;

    const rede = await RedeDatabase.findOne({
        isOnline: true
    })

    // console.log(rede)

    if(rede) {
        resultado = await registerUser.registerUser(nomeUsuario, rede)
    } else {
        console.log("Nenhuma rede iniciada!!!!")
        resultado = 3
    }

    if(resultado == 1){
        res.send(JSON.parse('{ "result":"success"}'));
    
    }else if(resultado == 2){    
        res.send(JSON.parse('{ "result":"recorded"}'));
    
    }else if(resultado == 3){    
        res.send(JSON.parse('{ "result":"adminMissing"}'));
    
    }else if(resultado == 4){    
        res.send(JSON.parse('{ "result":"error"}'));
    }
    
});

router.get('/enrollAdmin', async (req, res)=>{
    
    resultado = 0

    const rede = await RedeDatabase.findOne({
        isOnline: true
    })

    // console.log(rede)

    if(rede) {
        resultado = await enrollAdmin.enrollAdmin(rede);
    } else {
        console.log("Nenhuma rede iniciada!!!!")
        resultado = 3
    }

    if(resultado == 1){
        res.send(JSON.parse('{ "result":"success"}'));
    }else if(resultado == 2){
        res.send(JSON.parse('{ "result":"exists"}'));
    }else if(resultado == 3){
        res.send(JSON.parse('{ "result":"error"}'));
    }
});

module.exports = router;