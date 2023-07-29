const express = require("express")
const app = express()
const cadastro = require("./api/cadastro")

var cors = require('cors')

async function inicio(){
    const database = require('./database.js');
    const tabelas = require('./funcionario.js');
    await database.sync();
    console.log("conectado ao banco de dados")   
}
inicio()
app.use(cors())
app.use(express.json({ extended: false }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api/cadastro', cadastro)
const Port = process.env.PORT ||8080;
app.listen(Port, () => console.log("Servidor rodando na porta "+Port))
