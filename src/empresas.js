const { DataTypes } = require('sequelize');
const md5 =require("md5")
const sequelize = require('./database'); // importe a instância do Sequelize que criaremos posteriormente

const Empresas = sequelize.define("Empresas", {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  senha:{
    type: DataTypes.STRING,
    allowNull: false,
  }
})
module.exports = Empresas