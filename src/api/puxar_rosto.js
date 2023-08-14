const express = require("express");
const check = require('./checkUser');
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const Sequelize = require('sequelize');
const { Op } = Sequelize;
/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function puxar(id_empresa, ids){
        try {
          if(ids == "TODOS"){
            const pesquisa = await Funcionario.findAll({
              where:{
                id_empresa:(id_empresa),
              },
              attributes:["id", "user", "face"]
            });
            return {status:"ok", dados:pesquisa}  
          }
          else{
            const pesquisa = await Funcionario.findAll({
              where:{
                id_empresa:(id_empresa),
                id: {
                  [Op.notIn]: ids,
                }
              },
              attributes:["id", "user", "face"]
            });
            return {status:"ok", dados:pesquisa}
          }
        } 
        catch (error) {
          console.log(error)
          return {status:"error", er:error}
        }
}
rota.post('/', async (req, res) => {
  
  try{
    if(check(req)){
      var h = req.headers.authorization.replace('Bearer ', '')
      var decode = jwt.decode(h)
      var result = await puxar(decode.payload.id, req.body.ids)
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