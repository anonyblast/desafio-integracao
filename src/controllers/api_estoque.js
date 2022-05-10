const express = require("express");
const router = express.Router();
const Estoque = require("../models/estoque_mysql");

// router.get("/", (req, res) => {
//   Estoque.findAll()
//     .then((estoque) => {
//       res.status(200).json(estoque);
//       console.log(estoque);
//     })
//     .catch((error) => {
//       res.status(500).send({
//         error: error,
//       });
//     });
// });

router.get("/:id/estoque", (req, res) => {
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

router.patch("/:id/estoque", (req, res) => {
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

router.delete("/:id/estoque", (req, res) => {
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

module.exports = router;
