const express = require("express");
const check = require('./checkUser');
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const fs = require('fs');
const path = require('path');

const zlib = require('zlib');

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function puxar(id_empresa, ids){
        try {
          if(ids == "TODOS"){
            const pesquisa = await Funcionario.findAll({
              where:{
                id_empresa:(id_empresa),
              },
              attributes:["id", "user", "face"]
            });
            const pasta = path.resolve(__dirname, '..', '..')+"\\"+String(id_empresa)
            const listaDeConteudos = {}
            const f = await fs.readdirSync(pasta);  
            f.forEach(file => {
              const filePath = path.join(pasta, file);
              const conteudo = fs.readFileSync(filePath, 'utf-8');
              listaDeConteudos[file.replace(".bin", "")] = conteudo
            });
            console.log(listaDeConteudos)
            return {status:"ok", dados:pesquisa, face:listaDeConteudos}  
          }
          else{
            console.log("passou aqui")
            const pesquisa = await Funcionario.findAll({
              where:{
                id_empresa:(id_empresa),
                id: {
                  [Op.notIn]: ids,
                }
              },
              attributes:["id", "user", "face"]
            });

            const pasta = path.resolve(__dirname, '..', '..')+"\\"+String(id_empresa)
            const listaDeConteudos = {}

            fs.readdir(pasta+"\\"+String(id_empresa), (err, files) => {
              if (err) {
                console.error('Erro ao ler a pasta:', err);
                return;
              }
            
              files.forEach(file => {
                const filePath = path.join(pasta, file);
                const conteudo = fs.readFileSync(filePath);
                listaDeConteudos[file.replace(".txt", "")] = conteudo
              });           
            });      
            return {status:"ok", dados:pesquisa, face:listaDeConteudos}
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
      var result = await puxar(decode.payload.id, req.body.ids)
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