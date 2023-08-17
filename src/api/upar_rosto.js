const express = require("express");
const check = require('./checkUser');
const Funcionario = require("../funcionario")
const rota = express.Router()
const jwt = require("jsonwebtoken")
const { exec } = require('child_process');
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
            funcionario.face = "tem"
            await funcionario.save();
            const pythonScriptPath = './src/descompress.py'
            const command = `python ${pythonScriptPath} "${face}" "${id_empresa}" "${id_funcionario}"`;
            exec(command, (error, stdout, stderr) => {
              if (error) {
                console.error(`Erro: ${error}`);
                return;
              }
              console.log(`Saída padrão: ${stdout}`);
              console.error(`Saída de erro: ${stderr}`);
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