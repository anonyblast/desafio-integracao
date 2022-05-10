const Sequelize = require('sequelize');
const db_pgsql = require('../../database/db_pgsql');

const Categoria = db_pgsql.define('categorias', {
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