const Sequelize = require("sequelize");
const db_pgsql = require("../../database/db_pgsql");

const Produto = db_pgsql.define("produtos", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idCategoria: {
    type: Sequelize.INTEGER,
    references: {
      model: "categorias",
      key: "id",
    },
  },
  codigo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  valor: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    // 0 - Inativo, 1 - Ativo
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Produto;
