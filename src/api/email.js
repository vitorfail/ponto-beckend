const express = require("express")
const rota = express.Router()
require('dotenv').config(); 

const nodemailer = require('nodemailer');
async function email(destino){
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: "vitor_andrademanoel@hotmail.com",
        pass: "BOKUDAKEGA1NA1MACH1"
      }
    });
    
    // Detalhes do e-mail
    let mailOptions = {
      from: "vitor_andrademanoel@hotmail.com",
      to: destino,
      subject: 'Assunto do E-mail',
      text: 'Conteúdo do E-mail'
    };
    await transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log('Server is ready to take our messages');
        }
      });
    // Enviando o e-mail
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('E-mail enviado: ' + info.response);
    });
  }
  email({email:"vitorbrchunin@hotmail.com", senha:"Nanatsunota1"}, "vitor_andrademanoel@hotmail.com")
  rota.post('/', async (req, res) => {
    try{
      var result = await email({email:"vitorbrchunin@hotmail.com", senha:"Nanatsunota1"}, "vitor_andrademanoel@hotmail.com")
      res.status(200).send({result:result})  
    }
    catch(error){
      res.status(500).send({result:error})
    }
  
});
module.exports = email;