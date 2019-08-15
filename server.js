const express = require('express');
const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');

const server = express();

server.use(express.json());
server.use(actionRouter);
server.use(projectRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Let's kill this sprint.</h1>`);
});

module.exports = server;
