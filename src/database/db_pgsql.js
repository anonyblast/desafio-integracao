const Sequelize = require('sequelize');
const config = require('../config/config');
const db_pgsql = new Sequelize(config.database, 'postgres', config.pw, {dialect: 'postgres', host: 'localhost', logging: false});

module.exports = db_pgsql;