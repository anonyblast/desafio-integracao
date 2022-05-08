const Sequelize = require('sequelize');
const config = require('../config/config');
const db_mysql = new Sequelize(config.database, config.user, config.pw, {dialect: 'mysql', host: 'localhost', logging: true});

module.exports = db_mysql;