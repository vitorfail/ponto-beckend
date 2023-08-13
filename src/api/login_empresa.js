const md5 = require('md5');
const Empresa = require('../empresas');
const Funcionario = require('../funcionario');
const express = require("express")
const rota = express.Router()
const jwt = require("jsonwebtoken")
require('dotenv').config(); 

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function login_empresas( user, senha){
        try {

          const empresa = await Empresa.findAll({
            where:{
              user:user,
              senha:md5(senha)
            }
          });
          if(empresa.length >0){
            const func = await Funcionario.findAll({
              where:{
                id_empresa:empresa[0].dataValues.id
              },
              attributes:["id" ,"user", "face"]
            })
            var token = jwt.sign({payload:{id:empresa[0].dataValues.id}}, process.env.PRIVATE_KEY)
            return {status:"ok", token:token, funcionarios:func}
          }
          else{
            return {status:"ok", er:"SENHA"}
          }
        } 
        catch (error) {
          console.log(error)
          return {status:"error"}
        }
}
rota.post('/', async (req, res) => {
    try{
      var result = await login_empresas(req.body.user, req.body.senha)
      res.status(200).send({result:result})  
    }
    catch(error){
      res.status(500).send({result:error})
    }
  
});
module.exports = rota;