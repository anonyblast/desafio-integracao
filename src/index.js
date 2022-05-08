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
})();