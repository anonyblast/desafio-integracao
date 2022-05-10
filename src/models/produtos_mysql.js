const Sequelize = require('sequelize');
const db_mysql = require('../database/db_mysql');

const Produto = db_mysql.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCategoria: {
        type: Sequelize.INTEGER,
        references: {
            model: 'categorias',
            key: 'id'
        }
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    status: { // 0 - Inativo, 1 - Ativo
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Produto;