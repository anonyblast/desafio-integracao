const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const Categoria = require("../models/mysql/categorias_mysql");

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
  const { id } = req.params;

  await Categoria.findByPk(parseInt(id))
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

app.patch("/categorias/:id", async (req, res) => {
  const { id } = req.params;
  const { codigo, titulo, status } = req.body;
  await Categoria.findByPk(parseInt(id))
    .then((categoria) => {
      if (categoria) {
        if (codigo) {
          if (codigo.toUpperCase().substring(0, 4) !== "CAT-") {
            return res.status(400).send({
              error: "Código inválido (deve iniciar com CAT-)",
            });
          }
          categoria.codigo = codigo;
        }
        if (titulo) {
          categoria.titulo = titulo;
        }
        if (status) {
          if (!(status in [0, 1])) {
            return res.status(400).send({
              error: "Status inválido",
            });
          }
          categoria.status = status;
        }
        categoria.save();
        return res.status(200).send({
          message: "Categoria atualizada com sucesso",
        });
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

app.delete("/categorias/:id", async (req, res) => {
  const { id } = req.params;
  await Categoria.findByPk(parseInt(id))
    .then((categoria) => {
      if (categoria) {
        categoria.destroy();
        return res.status(200).send({
          message: "Categoria excluída com sucesso",
        });
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

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}`);
});
