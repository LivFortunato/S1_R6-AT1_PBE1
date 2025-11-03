const express = require('express');
const {produtoController} = require('../controllers/produtoController');
const produtoRoutes = express.Router()

const {podutoController} = require('../controllers/produtoController');

produtoRoutes.get('/produtos', produtoController.buscarTodosProdutos);
produtoRoutes.get('/produtos/idProduto', produtoController.buscarProdutosPorId);
produtoRoutes.post('/produtos', produtoController.incluirProduto);
produtoRoutes.put('/produtos/:idProduto', produtoController.atualizarProduto);
produtoRoutes.delete('/produtos/:idProduto', produtoController.excluirProduto);

module.exports = {produtoRoutes};