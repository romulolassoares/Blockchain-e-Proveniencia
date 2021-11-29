var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
   res.render('document/cadastrar', {
      css: ''
   });
})

router.post('/save', async (req,res) => {
   const { nome, cor, copias, orientacao } = req.body;
   const infoPrint = {
      docName: nome,
      color: cor,
      copy: copias,
      orientation: orientacao,
   };

   console.log(infoPrint)
})

module.exports = router;