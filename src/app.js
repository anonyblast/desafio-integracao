// Executar todas as apis da aplicação que estão na pasta /controllers
const express = require("express");
const app = express();
const node_cron = require("node-schedule");
const sequelize = require("sequelize");
const db_pgsql = require("./database/db_pgsql");
const rotaCategorias = require("./controllers/api_categorias");
const rotaEstoque = require("./controllers/api_estoque");
const rotaProdutos = require("./controllers/api_produtos");
const Estoque = require("./models/estoque_mysql");
const Produto = require("./models/produtos_mysql");
const Categoria = require("./models/categorias_mysql");
const Estoque_pgsql = require("./models/postgres/estoque_pgsql");
const Produto_pgsql = require("./models/postgres/produtos_pgsql");
const Categoria_pgsql = require("./models/postgres/categorias_pgsql");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/categorias", rotaCategorias);
app.use("/produtos", rotaProdutos);
app.use("/produtos", rotaEstoque); // /produtos/:id/estoque

// criar cron e conectar ao banco de dados, para cada endpoint, copiar os dados do mysql para o postgres
// criar a cron para copiar os dados para o postgres
const cron = node_cron.scheduleJob("*/1 * * * *", () => {
  console.log("Cron executando");
  // copiar os dados do mysql para o postgres
  db_pgsql.sync({ force: true }).then(() => {
    console.log("Cron executado");
    Estoque.findAll()
      .then((estoques) => {
        estoques.forEach((estoque) => {
          Estoque_pgsql.create({
            id: estoque.id,
            idProduto: estoque.produto_id,
            quantidade: estoque.quantidade,
          })
            .then(() => {
              console.log("Estoque criado");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    Produto.findAll()
      .then((produtos) => {
        produtos.forEach((produto) => {
          Produto_pgsql.create({
            id: produto.id,
            idCategoria: produto.categoria_id,
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            status: produto.status,
          })
            .then(() => {
              console.log("Produto criado");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });

    Categoria.findAll()
      .then((categorias) => {
        categorias.forEach((categoria) => {
          Categoria_pgsql.create({
            id: categoria.id,
            nome: categoria.nome,
          })
            .then(() => {
              console.log("Categoria criada");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

module.exports = app;
