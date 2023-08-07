const { DataTypes } = require('sequelize');
const md5 =require("md5")
const sequelize = require('./database'); // importe a instância do Sequelize que criaremos posteriormente
const RegistroPonto = require('./registro')

const Funcionario = sequelize.define('Funcionario', {
  id_empresa:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  face:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  status:{
    type: DataTypes.STRING,
    allowNull: true
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Antes de salvar o funcionário no banco de dados, vamos hashear a senha
Funcionario.beforeCreate(async (funcionario) => {
  const hash = await md5(funcionario.senha);
  funcionario.senha = hash;
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
Funcionario.hasMany(RegistroPonto, {
    onDelete: 'CASCADE',
});
Funcionario.hasMany(BancoHoras, {
  onDelete: 'CASCADE',
});

module.exports = Funcionario;