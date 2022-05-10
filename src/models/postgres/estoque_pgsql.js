const Sequelize = require("sequelize");
const db_pgsql = require("../../database/db_pgsql");

const Estoque = db_pgsql.define("estoques", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idProduto: {
    type: Sequelize.INTEGER,
    references: {
      model: "produtos",
      key: "id",
    },
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reserva: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    // 0 - Inativo, 1 - Ativo
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Estoque;
