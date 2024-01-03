
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));
app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

var mysql = require('mysql'); 
var conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "avaliacao01"
});
conexao.connect(function(err) {
  if (err) throw err;
  console.log("Banco de Dados Conectado");
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const Compra = require('./model/Compra');
const Material = require('./model/Material');
const Servidor = require('./model/Servidor');

/* Abrir página inicial do site */
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

/* Abrir e processar um formulário para cadastro de materiais */
app.get('/listaMaterial', function(req, res){
  var mat = new Material();

  mat.listar(conexao, function(result) {
    res.render('material/lista.ejs', {materiais: result});
  });
});

app.get('/formMaterial', function(req, res){
	res.sendFile(__dirname + '/views/material/formulario.html');
});

app.post('/processarMaterial', function(req, res){
  var m = new Material();

  m.nome = req.body.nome;
  m.descricao = req.body.descricao;
  m.preco = req.body.preco;
  m.unidade = req.body.unidade; 

  m.inserir(conexao);

  res.render('material/resultado.ejs')
});

/* Abrir e processar um formulário para cadastro de servidores  - codificar*/
app.get('/listaServidor', function(req, res){
  var serv = new Servidor();

  serv.listar(conexao, function(result) {
    res.render('servidor/lista.ejs', {servidores: result});
  });
});

app.get('/formServidor', function(req, res){
	res.sendFile(__dirname + '/views/servidor/formulario.html');
});

app.post('/processarServidor', function(req, res){
  var s = new Servidor();

  s.matricula = req.body.matricula;
  s.nome = req.body.nome;
  s.cargo = req.body.cargo;
  
  s.inserir(conexao);

  res.render('servidor/resultado.ejs')
});

/* Abrir e processar um formulário para cadastro de compra */
app.get('/formCompra', function(req, res){
	res.sendFile(__dirname + '/views/compra/formulario.html');
});

app.post('/processarCompra', function(req, res){
  var c = new Compra();

  c.urgencia = req.body.urgencia;
	c.quantidade = req.body.quantidade;
	
  c.serv.matricula = req.body.matricula;
  c.serv.nome = req.body.nome;
  c.serv.cargo = req.body.cargo;

	c.mat.nome = req.body.material;
  c.mat.descricao = req.body.descricao;
  c.mat.preco = req.body.preco;
  c.mat.unidade = req.body.unidade;  

  c.calcularValorCompra();
  c.calcularPrazoEntrega();

  res.render('compra/resultado.ejs', {comp: c});
});
