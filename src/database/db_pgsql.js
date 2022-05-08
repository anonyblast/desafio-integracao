const Sequelize = require('sequelize');
const config = require('../config/config');
const db_pgsql = new Sequelize(config.database, config.user, config.pw, {dialect: 'postgres', host: 'localhost'});

module.exports = db_pgsql;