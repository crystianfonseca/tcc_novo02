const express = require("express");
const router = express.Router();
const UsuarioDao = require("../Data/UsuarioDao");
const UsuarioModel = require("../Model/UsuarioModel");
const factory = require("../../factory_conect");
var conexao = factory();
var con = factory();
const usuarioDao = new UsuarioDao(conexao);

const bcrypt = require("bcryptjs");
const { render } = require("ejs");
const { ok } = require("assert");
const salto = bcrypt.genSaltSync(12);

//Requisição via get
router.get("/", (req, res) => {
  res.render("pages/home");
});

//esta págnina é para chamar pela primeira vez a página de login, para a pessoa digitar o login e a senha dela
router.get("/login", (req, res) => {
  console.log("testes login");
  res.render("pages/login", { retorno: "null" });
});
router.get("/agendamentoempresa", (req, res) => {
  res.render("pages/agendamentoempresa");
});
router.get("/cadastrocliente", (req, res) => {
  res.render("pages/cadastrocliente");
});
router.get("/agendamento", (req, res) => {
  res.render("pages/agendamento");
});
router.get("/cadastroempresa", (req, res) => {
  res.render("pages/cadastroempresa");
});
router.get("/cliente", (req, res) => {
  res.render("pages/cliente");
});
router.get("/home", (req, res) => {
  res.render("pages/home");
});

router.get("/index", (req, res) => {
  res.render("pages/index");
});
router.get("/NovaSenha", (req, res) => {
  res.render("pages/NovaSenha");
});
router.get("/pagempresa", (req, res) => {
  res.render("pages/pagempresa");
});
router.get("/recuperarsenha", (req, res) => {
  res.render("pages/recuperarsenha");
});
router.get("/Sistema", (req, res) => {
  res.render("pages/Sistema");
});

//Requisições via Post
router.post("/login", async (req, res) => {
  const login = req.body.login;
  const senha = req.body.senha;
  const senhaUsuario = bcrypt.hashSync(senha, salto);
  const retorno = await usuarioDao.GetAutenticUsuario(login, senhaUsuario);
  console.log(retorno);

  if (retorno.length > 0) {
    res.render("pages/Sistema", { retorno: retorno });
  } else {
    res.render("pages/login", { retorno: "erro" });
  }
});

router.post("/RecuperarSenha", async (req, res) => {
  const cpf = req.body.cpf;

  //const recuperaSenha = await usuarioDao.RecuperarSenha(cpf)

  console.log("------>>>>>>", recuperaSenha);

  if (recuperarSenha.length > 0) {
    email.RecuperarSenha(recuperaSenha[0].emailUsuario);
    res.render("pages/NovaSenha", { retorno: "sucesso" });
  } else {
    res.render("pages/NovaSenha", { retorno: "erro" });
  }

  console.log(cpf);
});

router.post("/CadastroCliente", (req, res) => {
  var senha = bcrypt.hashSync(Senha, salto);

  const usuarioCliente = {
    nomeCompleto: req.body.nomeCompleto,
    cpf: req.body.cnpj,
    Email: req.body.Email,
    pesquisacep: req.body.pesquisacep,
    rua: req.body.rua,
    Telefone: req.body.Telefone,
    cep: req.body.cep,
    Senha: senha,
  };

  const retorno = usuarioDao.SetUsuario(usuarioCliente);

  res.render("pages/login", { retorno: retorno });
});

router.post("/CadastroEmpresa", async (req, res) => {
  let idServicos = [];
  var senha = bcrypt.hashSync(req.body.senha, salto);
  var servico = req.body.servico;
  console.log(servico);

  for (i = 0; i < servico.length; i++) {
    idServicos.push(await usuarioDao.getIdByNameServico(servico[i]));
  }

  const cep = req.body.cep.replace("-", "");
  const usemp = {
    nomeCompleto: req.body.nome,
    cnpj: req.body.cnpj,
    email: req.body.email,
    cep: cep,
    rua: req.body.rua,
    telefone: req.body.telefone,
    senha: senha,
    number: req.body.number,
  };

  usuarios = await usuarioDao.SetUsuarioEmpresa(usemp);

  for (i = 0; i < servico.length; i++) {
    let id = Object.values(idServicos[i][0]);
    console.log("//////////", id[0], usuarios);
    const retorno = await usuarioDao.SetServicos(id[0], usuarios);
    console.log(retorno);
  }
  res.render("pages/login", { retorno: "ok" });
});

router.post("/RecuperarSenha", (req, res) => {
  const doc = req.body.doc;
  console.log(doc);
});

module.exports = router;
