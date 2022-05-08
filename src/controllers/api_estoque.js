const express = require("express");
const app = express();
const PORT = 3030;
const Estoque = require("../models/estoque_mysql");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/estoque", (req, res) => {
  Estoque.findAll()
    .then((estoque) => {
      res.status(200).json(estoque);
      console.log(estoque);
    })
    .catch((error) => {
      res.status(500).send({
        error: error,
      });
    });
});

app.get("/produtos/:id/estoque", (req, res) => {
  const { id } = req.params;
  Estoque.findOne({
    where: {
      idProduto: id,
    },
  })
    .then((estoque) => {
      if (estoque) {
        console.log(estoque);
        return res.status(200).json(estoque);
      } else {
        return res.status(404).send({
          error: "Estoque não encontrado",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        error: error,
      });
    });
});

app.patch("/produtos/:id/estoque", (req, res) => {
  const { id } = req.params;
  const { quantidade, reserva, status } = req.body;
  Estoque.findOne({
    where: {
      idProduto: id,
    },
  })
    .then((estoque) => {
      if (estoque) {
        estoque.quantidade = quantidade;
        estoque.reserva = reserva;
        if (!(status in [0, 1])) {
          return res.status(400).send({
            error: "Status inválido",
          });
        }
        estoque.status = status;
        estoque.save();
        return res.status(200).json(estoque);
      } else {
        return res.status(404).send({
          error: "Estoque não encontrado",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        error: error,
      });
    });
});

app.delete("/produtos/:id/estoque", (req, res) => {
  const { id } = req.params;
  Estoque.findOne({
    where: {
      idProduto: id,
    },
  })
    .then((estoque) => {
      if (estoque) {
        return res.status(501).send({
          error: "Não é possível excluir o estoque",
        });
      } else {
        return res.status(404).send({
          error: "Estoque não encontrado",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        error: error,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
