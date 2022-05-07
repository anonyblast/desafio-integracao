const Sequelize = require('sequelize');
const db_mysql = new Sequelize('mysql://root:root@localhost:3306/');

module.exports = db_mysql;