const md5 = require('md5');
const Funcionario = require('../funcionario');
const express = require("express")
const rota = express.Router()
const jwt = require("jsonwebtoken")
require('dotenv').config(); 

// Exemplo de criação de um funcionário
async function login_admin( id, senha){
        try {
          const funcionario = await Funcionario.findAll({
            where:{
              nivel:1,
              id:(id),
              senha:md5(senha)
            }
          });
          if(funcionario.length >0 && funcionario[0].dataValues.nivel == 1){
            var token = jwt.sign({id:funcionario[0].dataValues.id}, process.env.PRIVATE_KEY, {expiresIn:process.env.TIME})
            return {status:"ok", token:token}
          }
        } 
        catch (error) {
          
          return {status:"error"}
        }
}
rota.post('/', async (req, res) => {
    var result = await login_admin(req.body.id, req.body.senha)
    console.log(result)
    res.status(200).send({result:result})
});
module.exports = rota;