const Sequelize = require('sequelize');
const db_mysql = new Sequelize('desafio', 'olivgu01', 'Ebyeavnq16', {dialect: 'mysql', host: 'localhost'});

module.exports = db_mysql;