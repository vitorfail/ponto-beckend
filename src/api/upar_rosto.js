const express = require("express");
const check = require('./checkUser');
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")

require('dotenv').config(); 

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function rosto(id_empresa, id_funcionario, face){
        try {
          const funcionario = await Funcionario.findOne({
            where:{
              id_empresa:(id_empresa),
              id:(id_funcionario),
            }
          })
          if(funcionario){
            funcionario.face = face
            await funcionario.save();
            return {status:"ok"}  
          }
        } 
        catch (error) {
          return {status:"error"}
        }
}
rota.post('/', async (req, res) => {
  
  try{
    if(check(req)){
      var h = req.headers.authorization.replace('Bearer ', '')
      var decode = jwt.decode(h)
    
      var result = await rosto(decode.payload.id, req.body.id, req.body.face)
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