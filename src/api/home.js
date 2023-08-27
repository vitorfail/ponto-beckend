const express = require("express");
const check = require('./checkUser');
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const sequelize = require("../database")
/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function home(id_empresa){
        try {
          const total = await Funcionario.count({
            where:{
              id_empresa:(id_empresa)
            },
          })
          var h1 = "horaEntrada"
          var h2 = "hora_entrada_almoco"
          const trabalhando = await Funcionario.findAll({
            attributes: [
                [sequelize.literal('(SELECT COUNT(*) FROM "Funcionarios" AS "Funcionario" WHERE "Funcionario"."id_empresa" = '+id_empresa+' AND ("Funcionario"."status" = \'horaEntrada\' OR "Funcionario"."status" = \'hora_entrada_almoco\'))'), 'count'],
              ],
              where: {
                id: id_empresa,
              }
          })
          const funcionarios = await Funcionario.findAll({
            attributes: ["user", "status"],
              where: {
                id_empresa: id_empresa,
              }
          })
          const almoco = await Funcionario.count({
            where:{
              id_empresa:(id_empresa),
              status:"hora_saida_almoco"
            }
          })
          console.log((trabalhando[0].dataValues.count))
          return {status:"ok", total: total,trabalhando:trabalhando[0].dataValues.count, almoco:almoco, funcionarios:funcionarios}
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
      console.log(decode)
      var result = await home(decode.payload.id_empresa)
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