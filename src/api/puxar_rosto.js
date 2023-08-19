const express = require("express");
const check = require('./checkUser');
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const fs = require('fs');
const path = require('path');
const multer = require('multer');

var caminho = ""
// Configuração do Multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, caminho); // Define o diretório onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usa o nome original do arquivo
  }
});
const upload = multer({ storage: storage });

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
            caminho = pasta
            const listaDeConteudos = {}
            const f = await fs.readdirSync(pasta);  
            f.forEach(file => {
              const filePath = path.join(pasta, file);
              const conteudo = fs.readFileSync(filePath, 'utf8');
              listaDeConteudos[file.replace(".txt", "")] =Buffer.from(conteudo, 'base64')
            });
            console.log(listaDeConteudos)
            return {status:"ok", dados:pesquisa, face:listaDeConteudos}  
          }
          else{
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
            console.log(pasta)
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
rota.post('/',async (req, res) => {
  
  try{
    if(check(req)){
      var h = req.headers.authorization.replace('Bearer ', '')
      var decode = jwt.decode(h)
      console.log(req.body)
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
},  upload.single('arquivo'));
module.exports = rota;