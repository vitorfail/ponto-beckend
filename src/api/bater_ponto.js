const express = require("express");
const check = require('./checkUser');
const RegistroPonto = require("../registro")
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")
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
                json_atulizar_banco[nome] = data_hoje
                const v = await RegistroPonto.update(
                  json_atulizar_banco,
                  {where:{id:id}},
                )
                const f = await Funcionario.update(
                  {status:(nome)},
                  {where:{
                    id_empresa:id_empresa,
                    id:id_funcionario
                  }}
                )
                if(i == 5){
                  return {status:"ok", ponto:"Bom Almoço"}  
                }
                if(i == 6){
                  return {status:"ok", ponto:"Bem vindo de volta"}  
                }
                if(i == 7){
                  return {status:"ok", ponto:"Até amanhã!"}  
                }
                i= 9
              }
              else{
                if(i == 7){
                  return {status:"ok", ponto:"JA_SAIU"}    
                }
              }
            }
            return {status:"ok"}  
          }
          else{
            const funcionario = await RegistroPonto.create({id_empresa:id_empresa, id_funcionario:id_funcionario,dataRegistro: data.toISOString().slice(0, 10), horaEntrada:data});
            const f = await Funcionario.update(
              {status:"horaEntrada"},
              {where:{
                id_empresa:id_empresa,
                id:id_funcionario
              }}
            )
            return {status:"ok", ponto:"Bem-vindo(a)"}  
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