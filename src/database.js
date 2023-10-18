const { Sequelize } = require('sequelize');
require("dotenv").config()

if(process.env.URL == ""){
    const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: 'postgres',
        port:5432,
        pool: {
            max: 1,
            min: 1,
            idel: 10000
        }
      });
    module.exports = sequelize;
}
else{
    const sequelize = new Sequelize(process.env.URL,{dialect: process.env.TYPE});
    module.exports = sequelize;
}