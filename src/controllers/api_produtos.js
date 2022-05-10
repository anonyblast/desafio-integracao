const express = require("express");
const router = express.Router();
const Produto = require("../models/produtos_mysql");
const Categoria = require("../models/categorias_mysql");
const Estoque = require("../models/estoque_mysql");

router.get("/", (req, res) => {
  Produto.findAll()
    .then((produtos) => {
      res.status(200).json(produtos);
      console.log(produtos);
    })
    .catch((error) => {
      res.status(500).send({
        error: error,
      });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  await Produto.findByPk(parseInt(id))
    .then((produto) => {
      if (produto) {
        return res.status(200).json(produto);
      } else {
        return res.status(404).send({
          error: "Produto não encontrado",
        });
      }
    })
    .catch((error) => {
      return res.status(500).send({
        error: error,
      });
    });
});

router.post("/", async (req, res) => {
  // Verificar se a categoria existe, se existir, verificar se o produto já existe, se não existir,
  // criar o produto e adicionar ao estoque
  const { idCategoria, codigo, nome, descricao, valor, status } = req.body;
  const categoria = await Categoria.findByPk(parseInt(idCategoria));
  if (categoria) {
    await Produto.findOne({
      where: {
        codigo: codigo,
      },
    }).then((produto) => {
      // create a new produto and add it to the estoque
      if (produto) {
        return res.status(400).send({
          error: "Produto já existe",
        });
      } else if (!(status in [0, 1])) {
        return res.status(400).send({
          error: "Status inválido",
        });
      } else if (codigo.toUpperCase().substring(0, 4) !== "PRO-") {
        return res.status(400).send({
          error: "Código inválido (deve iniciar com PRO-)",
        });
      } else {
        // create a new produto and add it to the estoque
        Produto.create({
          idCategoria: idCategoria,
          codigo: codigo,
          nome: nome,
          descricao: descricao,
          valor: valor,
          status: status,
        })
          .then((produto) => {
            Estoque.create({
              idProduto: produto.id,
              quantidade: 0,
              reserva : 0,
              status: produto.status,
            })
              .then((estoque) => {
                res.status(201).json(produto);
              })
              .catch((error) => {
                res.status(500).send({
                  error: error,
                });
              });
          })
          .catch((error) => {
            res.status(500).send({
              error: error,
            });
          });
      }
    });
  } else {
    return res.status(404).send({
      error: "Categoria não encontrada",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { idCategoria, codigo, nome, descricao, valor, status } = req.body;
  const categoria = await Categoria.findByPk(parseInt(idCategoria));
  if (categoria) {
    await Produto.findByPk(parseInt(id))
      .then((produto) => {
        if (produto) {
          if (codigo || nome || descricao || valor || status) {
            produto.codigo = codigo;
            produto.nome = nome;
            produto.descricao = descricao;
            produto.valor = valor;
            produto.status = status;
          }
          produto.save();
          return res.status(200).send({
            message: "Produto atualizado com sucesso",
          });
        } else {
          return res.status(404).send({
            error: "Produto não encontrado",
          });
        }
      })
      .catch((error) => {
        return res.status(500).send({
          error: error,
        });
      });
  } else {
    return res.status(404).send({
      error: "Categoria não encontrada",
    });
  }
});

router.delete("/:id", async (req, res) => {
  // se o produto existir, deletar o produto e o estoque
  const { id } = req.params;
  const produto = await Produto.findByPk(parseInt(id));
  if (produto) {
    await Estoque.destroy({
      where: {
        idProduto: produto.id,
      },
    });
    await Produto.destroy({
      where: {
        id: produto.id,
      },
    });
    return res.status(200).send({
      message: "Produto deletado com sucesso",
    });
  } else {
    return res.status(404).send({
      error: "Produto não encontrado",
    });
  }
});

module.exports = router;
