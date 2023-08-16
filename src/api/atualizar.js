const express = require("express");
const check = require('./checkUser');
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const zlib = require('zlib');

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function atualizar(id){
        try {
            const pesquisa = await Funcionario.findOne({
              where:{
                id:(id),
              },
              attributes:["id", "user", "face"]
            });
            pesquisa.face = null
            pesquisa.save()
            return {status:"ok"} 
        } 
        catch (error) {
          console.log(error)
          return {status:"error", er:error}
        }
}
rota.post('/', async (req, res) => {
  
  try{
      var result = await atualizar(req.body.id)
      res.status(200).send({result:result})
  }
  catch(error){
    console.log(error)
    res.status(500).send({result:error})
  }
});
module.exports = rota;