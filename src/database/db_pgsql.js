const Sequelize = require('sequelize');
const db_pgsql = new Sequelize('desafio', 'olivgu01', 'Ebyeavnq16', {dialect: 'postgres', host: 'localhost'});

module.exports = db_pgsql;