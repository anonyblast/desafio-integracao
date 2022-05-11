const express = require("express");
const app = express();
const node_cron = require("node-schedule");

// Importando os controllers
const rotaCategorias = require("./controllers/api_categorias");
const rotaEstoque = require("./controllers/api_estoque");
const rotaProdutos = require("./controllers/api_produtos");

// Configuração do banco de dados MySQL e PostgreSQL
const db_mysql = require("./database/db_mysql");
const db_pgsql = require("./database/db_pgsql");

// Schemas para o banco de dados MySQL
const Estoque = require("./models/estoque_mysql");
const Produto = require("./models/produtos_mysql");
const Categoria = require("./models/categorias_mysql");

// Schemas para o banco de dados PostgreSQL
const Estoque_pgsql = require("./models/postgres/estoque_pgsql");
const Produto_pgsql = require("./models/postgres/produtos_pgsql");
const Categoria_pgsql = require("./models/postgres/categorias_pgsql");


// Chamada das rotas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/categorias", rotaCategorias);
app.use("/produtos", rotaProdutos);
app.use("/produtos", rotaEstoque); // /produtos/:id/estoque

// Cron executada todos os dias de semana às 22h
const cron = node_cron.scheduleJob("* 22 * * 1-5", () => {
  console.log("\u001B[35m Cron executando \u001b[0m");
  db_mysql.sync({ force: true })
    .then((result) => {
      db_pgsql.sync({ force: true })
        .then(() => {
          Categoria.findAll()
            .then((categorias) => {
              Categoria_pgsql.bulkCreate(categorias)
                .then(() => {
                  console.log("\u001B[32m Categorias importadas \u001b[0m");
                })
                .catch((error) => {
                  console.log(
                    "\u001B[31m Erro ao importar categorias [POSTGRESQL] \u001b[0m"
                  );
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log("\u001B[31m Erro ao importar categorias [MYSQL] \u001b[0m");
              console.log(error);
            });
          Produto.findAll()
            .then((produtos) => {
              Produto_pgsql.bulkCreate(produtos)
                .then(() => {
                  console.log("\u001B[32m Produtos importados \u001b[0m");
                })
                .catch((error) => {
                  console.log("\u001B[31m Erro ao importar produtos [POSTGRESQL] \u001b[0m");
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log("\u001B[31m Erro ao importar produtos [MYSQL] \u001b[0m");
              console.log(error);
            });
          Estoque.findAll()
            .then((estoque) => {
              Estoque_pgsql.bulkCreate(estoque)
                .then(() => {
                  console.log("\u001B[32m Estoque importado \u001b[0m");
                })
                .catch((error) => {
                  console.log("\u001B[31m Erro ao importar estoque [POSTGRESQL] \u001b[0m");
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log("\u001B[31m Erro ao importar estoque [MYSQL] \u001b[0m");
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("\u001B[31m Erro na conexão com o banco [POSTGRESQL] \u001b[0m");
          console.log(error);
        });
    })
    .catch((error) => {
      console.log("\u001B[31m Erro na conexão com o banco [MySQL] \u001b[0m");
      console.log(error);
    });
});

module.exports = app;
