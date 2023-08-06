const express = require("express");
const check = require('./checkUser');
const RegistroPonto = require("../registro")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const sequelize = require("sequelize")
/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function bater(id_empresa, id_funcionario){
        try {
          var data = new Date()
          const pesquisa = await RegistroPonto.findAll({
            where:{
              id_empresa:(id_empresa),
              id_funcionario:(id_funcionario),
              dataRegistro:(data.toISOString().slice(0, 10))
            }
          });
          if(pesquisa.length>0){
            var data_hoje = new Date()
            var variaveis = Object.keys(pesquisa[0].dataValues)
            for(var i = 5;i<8;i++){
              var v = pesquisa[0].dataValues[variaveis[i]]
              var id = pesquisa[0].dataValues.id
              if(v == null){
                var nome = variaveis[i] 
                var json_atulizar_banco = {}
                json_atulizar_banco[nome] = data_hoje.toISOString() 
                const ponto = await RegistroPonto.update(
                  json_atulizar_banco,
                  {where:{id:id}},
                )
                if(i == 7){
                  return {status:"ok", ponto:"saida"}  
                }
                i= 9
              }
              else{
                if(i == 7){
                  console.log("passou por aqui")

                  return {status:"ok", ponto:"JA_SAIU"}    
                }
              }
            }
            return {status:"ok"}  
          }
          else{
            const funcionario = await RegistroPonto.create({id_empresa:id_empresa, id_funcionario:id_funcionario,dataRegistro: data.toISOString().slice(0, 10), horaEntrada:data.toISOString()});
            return {status:"ok"}  
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
      var result = await bater(decode.payload.id, req.body.cod)
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