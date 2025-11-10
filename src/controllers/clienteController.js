const { query } = require('../config/db');
const { clienteModel } = require('../models/clienteModel');

const clienteController = {
    selecionaTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionaTodosClientes();
            res.status(200).json({ result: resultado });
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

    selecionarPorId: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um identificador (ID) válido' });
            }
            const resultado = await clienteModel.selecionarPorId(id)
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    alterarCliente: async (req, res) => {
        try {
            let idCliente = Number(req.params.idCliente);
            let { nome, cpf } = req.body;

            console.log((nome));
            
            if (!idCliente || !nome || !cpf || typeof idCliente !== 'number' || !isNaN(nome) || cpf.length != 11 || nome.trim().length < 3) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            };

            const clienteAtual = await clienteModel.selecionarPorId(idCliente);
            if (clienteAtual.length === 0) {
                throw new Error('Registro não localizado ');
            }

            const novoNome = nome ?? clienteAtual[0].nome;
            const novoCpf = cpf ?? clienteAtual[0].cpf;
            
            
            const resultado = await clienteModel.alterarCliente(idCliente, novoNome, novoCpf);

            if (resultado.changeRows === 0) {
                throw new Error('Ocorreu um erro ao atualizar o produto');
            }

            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado });


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    deleteCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um ID válido' });
            }

            const clienteSelecionado = await clienteModel.selecionarPorId(id);
            console.log(clienteSelecionado);
            if (clienteSelecionado.length === 0) {
                throw new Error('Resgistro não localizado');
            } else {
                const resultado = await clienteModel.deleteCliente(id)
                if (resultado.affectedRows === 1) {
                    res.status(200).json({ message: ' Produto excluído com sucesso', data: resultado });
                } else {
                    throw new Error('Não foi possível excluir o produto');
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

};

module.exports = { clienteController };