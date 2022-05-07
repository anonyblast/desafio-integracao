const Sequelize = require('sequelize');
const db = new Sequelize('mysql://root:root@localhost:3306/');

module.exports = db;