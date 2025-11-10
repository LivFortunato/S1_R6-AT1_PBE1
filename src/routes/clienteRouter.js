const express = require('express');
const clienteRoutes = express.Router();

//Referência do arquivo de rotas
const {clienteController} = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.selecionaTodosClientes);
clienteRoutes.post('/clientes', clienteController.inserirCliente);
clienteRoutes.put('/clientes/:idCliente', clienteController.alterarCliente);
clienteRoutes.delete('/clientes/:idCliente', clienteController.deleteCliente);
clienteRoutes.get('/clientes/:idCliente', clienteController.selecionarPorId);

module.exports = {clienteRoutes};