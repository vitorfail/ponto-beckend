const express = require("express");
const check = require('./checkUser');
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const {sequelize,Op} = require("sequelize")
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
          const trabalhando = await Funcionario.count({
            where:{
              id_empresa:(id_empresa),
              [Op.or]:[
                {status: 'horaEntrada'},
                {status: "hora_entrada_almoco"}
              ]            
            },
          })
          const almoco = await Funcionario.count({
            where:{
              id_empresa:(id_empresa),
              status:"hora_saida_almoco"
            }
          })
          return {status:"ok", total: total,trabalhando:trabalhando, almoco:almoco}
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