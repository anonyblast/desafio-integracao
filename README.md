<h1 align="center">Multiplier - Desafio de Integração</h1>
<p text-align="justify">
Primeiramente, seja bem vindo a página da minha solução do desafio!
Para mais informações sobre o autor, <a href="https://github.com/anonyblast" target="_blank">clique aqui</a>
</p>
<h3>Tecnologias Utilizadas: </h3>
<ul style="list-style: none; display: flex; flex-direction:row;">
    <li style="margin:20px;"><img src="https://img.icons8.com/color/48/000000/nodejs.png"/></li>
    <li style="margin:20px;"><img src="https://img.icons8.com/color/48/000000/javascript--v1.png"/></li>
    <li style="margin:20px;"><img src="https://img.icons8.com/fluency/48/000000/mysql-logo.png"/></li>
    <li style="margin:20px;"><img src="https://img.icons8.com/color/48/000000/postgreesql.png"/></li> 
</ul>

## Requisitos do Projeto
- [x] Criar um Banco de dados PostgreSQL
- [x] Criar um Banco de dados MySQL
- [x] Criar uma api para consumir o banco de dados Mysql utilizando Sequelize como ORM
- [x] Criar um serviço cron utilizando node-schedule para buscar dados na API e salvar no banco de dados PostgreSQL

## Status do Projeto (OK!) : 
- [X] Desenvolvimento
- [x] Testes

## 🎲 Executando a aplicação
#### [IMPORTANTE] LEMBRE-SE DE INSTALAR AS FERRAMENTAS (NODEJS, MYSQL e POSTGRESQL)
- [Node.js](https://nodejs.org/en/download/)
- [MySQL](https://www.mysql.com/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)
  
```bash
# Crie uma pasta
$ mkdir nome-da-pasta

# Acesse a pasta que você acabou de criar
$ cd nome-da-pasta

# Clone este repositório
$ git clone https://github.com/anonyblast/desafio-integracao.git

# Instale as dependências
$ npm install

# MUDE AS INFORMAÇÕES NO ARQUIVO src/config/config.json

# Execute a aplicação em modo de desenvolvimento 
# Esse comando irá inicializar o banco de dados MySQL com dados fakes
$ npm run desafio
# OU
# Execute apenas a aplicação sem inicializar o banco
$ npm start

# O servidor iniciará na porta:3300 - acesse <http://localhost:3300>
```
> Para facilitar em qualquer um dos casos de execução, aparecerão alertas representando as ações