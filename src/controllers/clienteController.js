const { clienteModel } = require('../models/clienteModel');

const clienteController = {
selecionaTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionaTodosClientes();
             res.status(200).json({result: resultado});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });

        }
},

    inserirCliente: async (req, res) => {
        try {
            const { nome, cpf } = req.body;
            if (nome.length < 3 || cpf.length != 11) {
                return res.status(400).json({ message: 'Dados inválidos' });
            }
            const resultadoCpf = await clienteModel.selecionaClientesCpf(cpf);
            console.log(resultadoCpf)
            if (resultadoCpf.length === 1) {
                return res.status(409).json({ message: 'Cpf já está cadastrado, informe um cpf válido!' });
            }

            const resultado = await clienteModel.inserirCliente(nome, cpf);

            if (resultado.affectedRows === 1) {
                res.status(201).json({
                    message: 'Registro incluído com sucesso.',
                    result: resultado
                });
            } else {
                throw new Error(' Ocorreu um erro ao incluir o registo');
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servido', errorMessage: error.message });
        }
    },

};

module.exports = {clienteController};