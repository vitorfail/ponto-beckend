const { DataTypes } = require('sequelize');
const md5 =require("md5")
const sequelize = require('./database');

const RegistroPonto = sequelize.define('RegistroPonto', {
    id_empresa:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_funcionario:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dataRegistro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horaEntrada: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    hora_saida_almoco: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    hora_entrada_almoco: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    horaSaida: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    bancoHoras:{
      type: DataTypes.TIME,
      allowNull: true,
    }
});
const BancoHoras = sequelize.define('BancoHoras', {
  id_empresa:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  banco: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
})



module.exports = RegistroPonto;