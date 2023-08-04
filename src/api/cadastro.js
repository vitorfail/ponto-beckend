const Funcionario = require('../funcionario');
const RegistroPonto = require('../registro');

const express = require("express");
const check = require('./checkUser');
const rota = express.Router()
const jwt = require("jsonwebtoken")

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function cadastro(id_empresa, user, email, senha, nivel){
        try {
          const pesquisa = await Funcionario.findAll({
            where:{
              id_empresa:id_empresa,
              user:user
            }
          });
          if(pesquisa.length>0){
            return "JA_EXISTE"
          }
          else{
            const funcionario = await Funcionario.create({id_empresa, user, });
            const pont = await RegistroPonto.create({})
            return {status:"ok", id:funcionario.id}  
          }
        } 
        catch (error) {
          console.log(error)
          return {status:"error"}
        }
}
rota.post('/', async (req, res) => {
  try{
    if(check(req)){
      var h = req.headers.authorization.replace('Bearer ', '')
      var decode = jwt.decode(h)
      var result = await cadastro(decode.payload.id, req.body.user, req.body.email, req.body.senha, req.body.nivel)
      res.status(200).send({result:result})
    }
    else{
      res.status(200).send({result:"NOT USER"})
    }
  }
  catch(error){
    console.log(error)
    res.status(500).send({result:error})
  }
});
module.exports = rota;