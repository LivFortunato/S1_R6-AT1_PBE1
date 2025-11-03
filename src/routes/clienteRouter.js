const express = require('express');
const clienteRoutes = express.Router();

//Referência do arquivo de rotas
const {clienteController} = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.selecionaTodosClientes);
clienteRoutes.post('/clientes', clienteController.inserirCliente);

module.exports = {clienteRoutes};