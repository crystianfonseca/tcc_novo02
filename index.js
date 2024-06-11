const express = require("express"); //importa a biblioteca do express
const app = express(); //cria um objeto express
const port = 3000; //atribui a constante port o valor 3000
const session = require("express-session"); //importa a biblioteca express-session
// body-parse verifica as requisições antes do controller
const bodyParse = require("body-parser"); // importa a biblioteca body-parse
/* A biblioteca path é utilizada para manipulação de pastas e arquivos no node js */
const path = require("path"); // importa a biblioteca path
//configura a sessão

app.use(
  session({
    secret: "aula_node",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

app.use(function (req, res, next) {
  res.locals.id_user = req.session?.id_u;
  next();
});

// carrega os scripts
app.use(express.static("./app/Public"));
//atribui a configuração o mecanismo de modelo ejs
app.set("view engine", "ejs");
//atribui a pasta onde estão as visualizações, neste caso pasta views, dentro de app
app.set("views", "./app/View");
/*atribui para as configurações a utilização da middleware bodyParse, 
limita a verificação a 50Mb, o objeto pode retornar um array ou uma string, 
neste caso utiliza-se extended:fase, ou um objeto json, neste caso extended:true */
app.use(bodyParse.urlencoded({ limit: "50mb", extended: true }));
//Atribui a variável rotas o caminho físico da pasta onde está o arquivo de rotas
var rotas = require("./app/Router/router");
//Atribui ao sistema o caminho das rotas
app.use("/", rotas);

//inicia o servidor na porta que esta na variável de sistema ou a variável port
app.listen(process.env.PORT || port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nSite On Page:${port}`);
});
console.log("Olá mundo");
