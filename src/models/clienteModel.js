const pool = require("../config/db");

const clienteModel= {

    selecionaTodosClientes: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },
    selecionaClientesCpf: async (pCpf) => {
        const sql = 'SELECT * FROM clientes WHERE cpf_cliente=?;';
        const values = [pCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    inserirCliente: async (pNome, pCpf) => {
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?)';
        const values = [pNome, pCpf];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
}
module.exports = { clienteModel };