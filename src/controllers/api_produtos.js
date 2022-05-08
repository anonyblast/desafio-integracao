const express = require("express");
const app = express();
const PORT = 3333;
const Produto = require("../models/produtos_mysql");
const Categoria = require("../models/categorias_mysql");
const Estoque = require("../models/estoque_mysql");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/produtos", (req, res) => {
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

app.get("/produtos/:id", async (req, res) => {
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

app.post("/produtos", async (req, res) => {
  // Verificar se a categoria existe, se existir, verificar se o produto já existe, se não existir,
  // criar o produto e adicionar ao estoque
  const { idCategorias, codigo, nome, descricao, valor, status } = req.body;
  const categoria = await Categoria.findByPk(parseInt(idCategorias));
  if (categoria) {
    await Produto.findOne({
      where: {
        codigo: codigo,
      },
    })
      .then((produto) => {
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
          Produto.create({
            idCategorias: idCategorias,
            codigo: codigo,
            nome: nome,
            descricao: descricao,
            valor: valor,
            status: status,
          });
          Estoque.create({
            idProduto: produto.id,
            status: status,
            reserva: 0,
            quantidade: 0,
          });
          return res.status(201).send({
            message: "Produto criado com sucesso",
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

app.patch("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { idCategorias, codigo, nome, descricao, valor, status } = req.body;
  const categoria = await Categoria.findByPk(parseInt(idCategorias));
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

app.delete("/produtos/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
