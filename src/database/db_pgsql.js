const Sequelize = require('sequelize');
const db_pgsql = new Sequelize('postgres://postgres:postgres@localhost:5432/');

module.exports = db_pgsql;