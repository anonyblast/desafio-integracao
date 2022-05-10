const Sequelize = require('sequelize');
const db_myql = require('../../database/db_mysql');

const Categoria = db_myql.define('categorias', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: { // 0 - Inativo, 1 - Ativo
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Categoria;