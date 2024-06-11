const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = 3000;
var path = require('path');
const app = express();

var login = "12345678912";
var password = "12345";

app.use(session({secret: '987456'}));
app.use(bodyParser.irlencoded({extended: true}));

app.engine('html', require('ejs').renderFile;
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/View'));


app.post('/',(req,res)=>{

  if(req.body.password == password && req.body.login == login){
    //logado com sucesso
    req.session.login = login
    res.redirect('/index');
  }else{
  res.render('/login');
  }})

app.get('/', (req,res)=>{
  if(req.session.login){
    res.render('/index');
  }else{
    res.render('/login');
  }
})

app.listen(port,()=>{
  console.log('Servidor rodando');
})
