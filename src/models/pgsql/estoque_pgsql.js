const Sequelize = require('sequelize');
const db_pgsql = require('../../database/db_pgsql');

const Estoque = db_pgsql.define('estoque', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProduto: {
        type: Sequelize.INTEGER,
        allowNull: false
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