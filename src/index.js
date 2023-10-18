const express = require("express")
const app = express()
const cadastro = require("./api/cadastro")
const cadastro_empresa = require("./api/cadastro_empresa")
const login_admin = require("./api/login_admin")
const login_empresa = require("./api/login_empresa")
const ponto = require("./api/bater_ponto")
const home = require("./api/home")
const upar_rosto =require("./api/upar_rosto")
const banco =require("./api/banco")


var cors = require('cors')
async function inicio(){
    const database = require('./database.js');
    const tabelas = require('./funcionario.js');
    const empresas = require('./empresas.js');
    await database.sync();
    console.log("conectado ao banco de dados")   
}
inicio()
app.use(cors())
app.use(express.json({limit: '534kb', extended: false }));
app.use(express.urlencoded({limit: '534kb', extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/home', home)
app.use('/api/cadastro', cadastro)
app.use('/api/login_empresa', login_empresa)
app.use('/api/ponto', ponto)
app.use("/api/login_admin", login_admin)
app.use("/api/cadastro_empresa", cadastro_empresa)
app.use("/api/upar_rosto", upar_rosto)
app.use("/api/banco", banco)

const Port = process.env.PORT ||8080;
app.listen(Port, () => console.log("Servidor rodando na porta "+Port))
