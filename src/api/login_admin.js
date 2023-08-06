const md5 = require('md5');
const Funcionario = require('../funcionario');
const express = require("express")
const rota = express.Router()
const jwt = require("jsonwebtoken");
const Empresas = require('../empresas');
require('dotenv').config(); 

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function login_admin( user, senha, cod){
        try {
          const empresas = await Empresas.findAll({
            where:{
              user:(user),
              senha:md5(senha)
            }
          });
          const funcionario = await Funcionario.findAll({
            where:{
              id_empresa:empresas[0].dataValues.id,
              nivel:1,
              id:(cod),
            }
          });
          if(funcionario.length >0 && funcionario[0].dataValues.nivel == 1){
            var token = jwt.sign({payload: { id_f:funcionario[0].dataValues.id, id_empresa: funcionario[0].dataValues.id_empresa}}, process.env.PRIVATE_KEY)
            return {status:"ok", token:token}
          }
        } 
        catch (error) {
          return {status:"error"}
        }
}
rota.post('/', async (req, res) => {
    try{
      console.log(req.body)
      var result = await login_admin(req.body.user, req.body.senha, req.body.cod)
      res.status(200).send({result:result})  
    }
    catch(error){
      res.status(500).send({result:error})
    }
  
});
module.exports = rota;