const { DataTypes } = require('sequelize');
const md5 =require("md5")
const sequelize = require('./database'); // importe a instância do Sequelize que criaremos posteriormente

const Funcionario = sequelize.define('Funcionario', {
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
const RegistroPonto = sequelize.define('RegistroPonto', {
    dataRegistro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horaEntrada: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_saida_almoco: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_entrada_almoco: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaSaida: {
      type: DataTypes.TIME,
      allowNull: true,
    },
});
const BancoHoras = sequelize.define('BancoHoras', {
  banco: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
})
RegistroPonto.belongsTo(Funcionario, {
    foreignKey: {
      allowNull: false,
    },
});
BancoHoras.belongsTo(Funcionario, {
  foreignKey: {
    allowNull: false,
  },
});
Funcionario.hasMany(RegistroPonto, {
    onDelete: 'CASCADE',
});
Funcionario.hasMany(BancoHoras, {
  onDelete: 'CASCADE',
});

module.exports = Funcionario;