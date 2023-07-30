const Funcionario = require('../funcionario');
const express = require("express")
const rota = express.Router()

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function cadastro( user, email, senha, nivel){
        try {
          const pesquisa = await Funcionario.findAll({
            where:{
              user:(user)
            }
          });
          if(pesquisa.length>0){
            return "JA_EXISTE"
          }
          else{
            const funcionario = await Funcionario.create({ user, email, senha, nivel });
            return {status:"ok", id:funcionario.id}  
          }
        } 
        catch (error) {
          console.log(error)
          return {status:"error"}
        }
}
rota.post('/', async (req, res) => {
    var result = await cadastro(req.body.user, req.body.email, req.body.senha, req.body.nivel)
    res.status(200).send({result:result})
});
module.exports = rota;