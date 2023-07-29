const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./database'); // importe a instância do Sequelize que criaremos posteriormente

const Funcionario = sequelize.define('Funcionario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Antes de salvar o funcionário no banco de dados, vamos hashear a senha
Funcionario.beforeCreate(async (funcionario) => {
  const hash = await bcrypt.hash(funcionario.senha, 10);
  funcionario.senha = hash;
});
const RegistroPonto = sequelize.define('RegistroPonto', {
    dataRegistro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horaEntrada: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaSaida: {
      type: DataTypes.TIME,
      allowNull: true,
    },
});
RegistroPonto.belongsTo(Funcionario, {
    foreignKey: {
      allowNull: false,
    },
  });

  Funcionario.hasMany(RegistroPonto, {
    onDelete: 'CASCADE',
});

module.exports = Funcionario;