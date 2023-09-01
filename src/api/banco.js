const express = require("express");
const check = require('./checkUser');
const RegistroPonto = require("../registro")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const sequelize = require("sequelize")
const {Op} = require("sequelize")
/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function banco(id_empresa, id_funcionario, mes, ano){

        var pesquisa_ano = ano === "TODOS"? ' AND EXTRACT(\'Year\' FROM "RegistroPonto"."createdAt") > 0': ' AND EXTRACT(\'Year\' FROM "RegistroPonto"."createdAt") = '+ano
        var  pesquisa_mes  = mes === "TODOS"? 'EXTRACT(\'Month\' FROM "RegistroPonto"."createdAt") > 0': ' EXTRACT(\'Month\' FROM "RegistroPonto"."createdAt") = '+mes
        try {
          console.log('passou')

          const pesquisa = await RegistroPonto.findAll({
            attributes: ["dataRegistro", 
            [sequelize.literal('("RegistroPonto"."hora_saida_almoco" - "RegistroPonto"."horaEntrada") + ("RegistroPonto"."horaSaida" - "RegistroPonto"."hora_entrada_almoco")'), 'diferenca_de_datas'],
          ],
          where: {
            [Op.and]: [
              {id_funcionario:id_funcionario,
              id_empresa:id_empresa},
              sequelize.literal(pesquisa_mes+pesquisa_ano)
            ]}
          })
          return pesquisa
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
      console.log(decode)
      var result = await banco(decode.payload.id_empresa, decode.payload.id_f, req.body.mes, req.body.ano)
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