(async () => {
    const db_myql = require('./database/db_mysql');
    const Produto = require('./models/produtos_mysql');
    const Categoria = require('./models/categorias_mysql');

    try {
        const result = await db_myql.sync({ force: true });

        console.log(result);
    } catch (error) {
        console.log(error);
    }

    const categoriaCreate = await Categoria.create({
        codigo: 'CAT-001',
        titulo: 'Categoria 1',
        status: 1
    });
    console.log(categoriaCreate);

    const resultCreate = await Produto.create({
        idCategorias: categoriaCreate.id,
        codigo: '123',
        nome: 'Produto 1',
        descricao: 'Descrição do produto 1',
        valor: 10.00,
        status: 1
    });

    console.log(resultCreate);
})();