const Empresas = require('../empresas');
const express = require("express")
const rota = express.Router()

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function cadastro_empresa( user, senha){
        try {
          const pesquisa = await Empresas.findAll({
            where:{
              user:(user)
            }
          });
          if(pesquisa.length>0){
            return "JA_EXISTE"
          }
          else{
            const empresas = await Empresas.create({ user, senha});
            return {status:"ok", id:empresas.id}  
          }
        } 
        catch (error) {
          console.log(error)
          return {status:"error"}
        }
}
rota.post('/', async (req, res) => {
  try{
    var result = await cadastro_empresa(req.body.user, req.body.senha)
    res.status(200).send({result:result})
  }
  catch(error){
    res.status(500).send({result:error})
  }
});
module.exports = rota;