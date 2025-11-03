const express = require('express');
const router = express.Router();

//Referência do arquivo de rotas
const { clienteRoutes} = require('./clienteRouter');


router.use('/', clienteRoutes);
module.exports = {router};