const Funcionario = require('../funcionario');
const express = require("express")
const rota = express.Router()

// Exemplo de criação de um funcionário
async function cadastro( nome, email, senha){
        try {
          const funcionario = await Funcionario.create({ nome, email, senha });
          return 1
        } 
        catch (error) {
          return 0 
        }
}
rota.post('/', async (req, res) => {
    var result = await cadastro(req.body.nome, req.body.email, req.body.senha)
    res.status(200).send(result)
});
module.exports = rota;