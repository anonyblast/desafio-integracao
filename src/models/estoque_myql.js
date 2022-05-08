const Sequelize = require('sequelize');
const db_myql = require('../database/db_mysql');

const Estoque = db_myql.define('estoque', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProduto: {
        type: Sequelize.INTEGER,
        references: {
            model: 'produtos',
            key: 'id'
        }
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reserva: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: { // 0 - Inativo, 1 - Ativo
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Estoque;