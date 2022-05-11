(async () => {
    const database = require('./db_mysql')
    const Estoque = require('../models/estoque_mysql');
    const Produto = require('../models/produtos_mysql');
    const Categoria = require('../models/categorias_mysql');
    const blue  = '\u001b[34m';
    const reset = '\u001b[0m';
 
    try {
        const resultado = await database.sync();
        console.log(blue + "++++++ Base de Dados conectada com sucesso ++++++" + reset);
    } catch (error) {
        console.log(error);
    }

    const resultadoCreateCategoria = await Categoria.create({
        codigo: 'CAT-001',
        titulo: 'Categoria 1',
        status: 1,
    }).then((categoria) => {
        console.log(blue + "++++++ Categoria criada com sucesso" + reset);
    }).catch((error) => {
        console.log(error);
    });

    const resultadoCreateProduto = await Produto.create({
        codigo: 'PRO-001',
        idCategoria : 1,
        nome: 'Produto 1',
        descricao: 'Descrição do produto 1',
        valor : 10.00,
        status: 1,
    }) .then((produto) => {
        console.log(blue + "++++++ Produto criado com sucesso" + reset);
    }) .catch((error) => {
        console.log(error);
    });

    const resultadoCreateEstoque = await Estoque.create({
        idProduto : 1,
        quantidade: 10,
        reserva : 0,
        status: 1,
    }).then((estoque) => {
        console.log(blue + "++++++ Estoque criado com sucesso" + reset);
    }).catch ((error) => {
        console.log(error);
    });

    console.log(reset + "Fim do script");
})();