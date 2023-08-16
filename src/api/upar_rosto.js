const express = require("express");
const check = require('./checkUser');
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const zlib = require('zlib');
const path = require('path');

require('dotenv').config(); 

/**
 * GET product list.
 *
 * @return product list | empty.
 */
// Exemplo de criação de um funcionário
async function rosto(id_empresa, id_funcionario, face){
        try {
          const funcionario = await Funcionario.findOne({
            where:{
              id_empresa:(id_empresa),
              id:(id_funcionario),
            }
          })
          if(funcionario){
            funcionario.face = null
            await funcionario.save();
            const compressedData = Buffer.from(face, "binary"); // Substitua pelo seu próprio buffer de dados
            const comprimido = ""
            console.log(face)
            zlib.inflate(compressedData, (err, uncompressedData) => {
                if (!err) {
                    comprimido = uncompressedData.toString('utf-8')
                } else {
                  console.log(err)
                }
            });
            const pastaEspecifica = String(funcionario.id_empresa);
            const nomeDoArquivo = String(funcionario.id)+'.yml';
            const conteudoDoArquivo = comprimido;

            const caminhoCompleto = path.join(__dirname, pastaEspecifica, nomeDoArquivo);

            // Certificar-se de que a pasta exista
            if (!fs.existsSync(pastaEspecifica)) {
                fs.mkdirSync(pastaEspecifica);
            }
            // Escrever o conteúdo no arquivo
            fs.writeFile(caminhoCompleto, conteudoDoArquivo, (err) => {
                if (err) {
                } else {
                }
            });
            return {status:"ok"}  
          }
        } 
        catch (error) {
          return {status:"error"}
        }
}
rota.post('/', async (req, res) => {
  
  try{
    if(check(req)){
      var h = req.headers.authorization.replace('Bearer ', '')
      var decode = jwt.decode(h)
    
      var result = await rosto(decode.payload.id, req.body.id, req.body.face)
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