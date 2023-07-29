const express = require("express")
const app = express()
var cors = require('cors')

async function inicio(){
    const database = require('./database.js');
    const tabelas = require('./funcionario.js');
    await database.sync();
    console.log("conectado ao banco de dados")   
}
inicio()
app.use(cors())
const Port = process.env.PORT ||8080;
app.listen(Port, () => console.log("Servidor rodando na porta "+Port))
