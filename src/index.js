// Executar todas as apis da aplicação que estão na pasta /controllers
const requireDir = require("require-dir");

const apis = requireDir("./controllers");
console.log(apis);
