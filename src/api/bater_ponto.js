const express = require("express");
const check = require('./checkUser');
const RegistroPonto = require("../registro")
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
          var dataformatada = data.getFullYear()+"-"+(data.getMonth+1)+"-"+data.getDate()

          const pesquisa = await RegistroPonto.findAll({
            where:{
              id_empresa:(id_empresa),
              id_funcionario:(id_funcionario),
              dataRegistro:(dataformatada)
            }
          });
          if(pesquisa.length>0){
            var data_hoje = new Date()
            var variaveis = Object.keys(pesquisa[0].dataValues)
            for(var i = 5;i<8;i++){
              var v = pesquisa[0].dataValues[variaveis[i]]
              if(v == null){
               // const ponto = await RegistroPonto.define(
                //  {where:{id:pesquisa[0].dataValues.id}},
                //  {variaveis[i]:data_hoje}
              //  )

              }
            }
             // return {status:"ok", id:funcionario.id}  
           // }
          }
          else{
            //const funcionario = await RegistroPonto.create({id_empresa:id_empresa, id_funcionario:id_funcionario,dataRegistro: dataformatada, horaEntrada:data.toLocaleTimeString()});
            //return {status:"ok", id:funcionario.id}  
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