const { response } = require("express");
const express = require("express");
const router = express.Router();

const UserDatabase = require("../app/database/models/UserModel");
const registerUser = require("../app/transaction/registerUser");
const RedeDatabase = require("../app/database/models/RedeModel");

router.get("/", (req, res) => {
  res.render("user/index", {
    css: "",
  });
});

router.get("/new", (req, res) => {
  res.render("user/cadastrar", {
    css: "",
  });
});

router.post("/save", async (req, res) => {
   const { nome, descricao, permissao, pki } = req.body;

   const rede = await RedeDatabase.findOne({
      isOnline: true,
   });

   // console.log(rede)

   if (rede) {
      resultado = await registerUser.registerUser(pki, rede);
   } else {
      console.log("Nenhuma rede iniciada!!!!");
      resultado = 3;
   }

   if (resultado != 1) {
      res.redirect("/user/get");
   } else if (resultado == 1) {
      const userDatabase = new UserDatabase({
         nome: nome,
         descricao: descricao,
         permissao: permissao,
         pki: pki,
         network: rede["_id"],
      });

      await userDatabase.save();
      // createProvData.registerAgent(nome, pki, "user")
      res.redirect("/user/get");
   }
});

router.get("/get", (req, res) => {
  res.render("user/listar", {
    css: "",
  });
});

router.get("/getUsers", async (req, res) => {
  res.send(await UserDatabase.find());
});

module.exports = router;
