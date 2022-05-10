const requireDir = require('require-dir');
const apis = requireDir('./controllers');

// Executar todas as rotas
console.log(apis);