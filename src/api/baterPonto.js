const express = require("express");
const { default: check } = require('./checkUser');
const RegistroPonto = require("../registro")
const rota = express.Router()

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function bater(id_empresa, id){
        try {
          var data = new Date()
          const pesquisa = await RegistroPonto.findAll({
            where:{
              id_empresa:(id_empresa),
              id:(id),
              dataRegistro:(data)
            }
          });
          if(pesquisa.length>0){
            var data_hoje = new Date()
            console.log(Object.keys(pesquisa[0]))
            //if(pesquisa[0].horaEntrada == null){
            //  const ponto = await RegistroPonto.update(
             //   {where:{id:pesquisa[0].id}},
             //   {horaEntrada:data_hoje}
             // )
             // return {status:"ok", id:funcionario.id}  
           // }
          }
          else{
            const funcionario = await RegistroPonto.create({id_empresa, user, email, senha, nivel });
            return {status:"ok", id:funcionario.id}  
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
      var result = await bater(decode.payload.id, req.body.id)
      res.status(200).send({result:result})
    }
    else{
      res.status(200).send({result:"NOT USER"})
    }
  }
  catch(error){
    res.status(500).send({result:error})
  }
});
module.exports = rota;