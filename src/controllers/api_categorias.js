const express = require("express");
const app = express();
const PORT = 3000;
const db_mysql = require("../database/db_mysql");
const Categoria = require("../models/categorias_mysql");
const config = require("../config/config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/categorias", (req, res) => {
  Categoria.findAll()
    .then((categorias) => {
      res.status(200).json(categorias);
      console.log(categorias);
    })
    .catch((error) => {
      res.status(500).send({
        error: error,
      });
    });
});

app.get("/categorias/:id", async (req, res) => {
  const CategoriasID = req.params.id;

  await Categoria.findByPk(parseInt(CategoriasID))
    .then((categoria) => {
      if (categoria) {
        return res.status(200).json(categoria);
      } else {
        return res.status(404).send({
          error: "Categoria não encontrada",
        });
      }
    })
    .catch((error) => {
      return res.status(500).send({
        error: error,
      });
    });
});

app.post("/categorias", async (req, res) => {
  const { codigo, titulo, status } = req.body;
  await Categoria.findOne({
    where: {
      codigo: codigo,
    },
  })
    .then((categoria) => {
      if (categoria) {
        return res.status(400).send({
          error: "Categoria já existe",
        });
      } else if (!(status in [0, 1])) {
        return res.status(400).send({
          error: "Status inválido",
        });
      } else if (codigo.toUpperCase().substring(0, 4) !== "CAT-") {
        return res.status(400).send({
          error: "Código inválido (deve iniciar com CAT-)",
        });
      } else {
        Categoria.create({
          codigo: codigo,
          titulo: titulo,
          status: status,
        });
        return res.status(201).send({
          message: "Categoria criada com sucesso",
        });
      }
    })
    .catch((error) => {
      return res.status(500).send({
        error: error,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
