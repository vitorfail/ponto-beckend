const { Sequelize } = require('sequelize');
require("dotenv").config()

if(process.env.URL == ""){
    const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.TYPE,
      });
    module.exports = sequelize;
}
else{
    const sequelize = new Sequelize(process.env.URL,{dialect: process.env.TYPE});
    module.exports = sequelize;
}