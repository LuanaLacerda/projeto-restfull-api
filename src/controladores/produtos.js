const conexao = require('../conexao')


const cadastrarProduto = async (req, res) => {
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body
    const { usuarios } = req

    if (!nome) {
        return res.status(400).json('O campo nome é obrigatório')
    }

    if (!quantidade) {
        return res.status(400).json('O campo quantidade é obrigatório')
    }
    if (!preco) {
        return res.status(400).json('O campo quantidade é obrigatório')
    }
    if (!descricao) {
        return res.status(400).json('O campo quantidade é obrigatório')
    }
    try {
        const query = 'insert into produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)'

        const produto = await conexao.query(query, [usuarios.id, nome, quantidade, categoria, preco, descricao, imagem])

        return res.status(200).send()

    } catch (error) {
        return res.status(400).json(error.message)
    }



}
const listarProduto = async (req, res) => {
    try {
        const { usuarios } = req

        const query = 'select * from produtos where usuario_id = $1'
        const { rows: produtos } = await conexao.query(query, [usuarios.id])
        return res.status(200).json(produtos)

    } catch (error) {
        return res.status(400).json(error.message)
    }

};

const detalharProduto = async (req, res) => {
    const { id } = req.params
    const { usuarios } = req

    try {
        const produto = await conexao.query('select * from produtos where usuario_id = $1 and id = $2', [usuarios.id, id])

        if (produto.rowCount === 0) {
            return res.status(400).json(`Não existe produto cadastrado com o ID ${id}`)
        }

        return res.status(200).json(produto.rows[0])

    } catch (error) {
        return res.status(400).json(error.message)
    }

};

const atualizarProduto = async (req, res) => {
    const { id } = req.params
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body
    const { usuarios } = req

    try {
        const produto = await conexao.query('select * from produtos where usuario_id = $1 and id = $2', [usuarios.id, id])

        if (produto.rowCount === 0) {
            return res.status(400).json(`Não existe produto cadastrado com o ID ${id}`)
        }

        if (!nome) {
            return res.status(400).json('O campo nome é obrigatório')
        }

        if (!quantidade) {
            return res.status(400).json('O campo quantidade é obrigatório')
        }
        if (!preco) {
            return res.status(400).json('O campo quantidade é obrigatório')
        }
        if (!descricao) {
            return res.status(400).json('O campo quantidade é obrigatório')
        }

        const query = 'update produtos set usuario_id = $1, nome = $2, quantidade = $3, categoria = $4, preco = $5, descricao = $6, imagem = $7 where id = $8'
        const produtoAtualizado = await conexao.query(query, [usuarios.id, nome, quantidade, categoria, preco, descricao, imagem, id])

        return res.status(200).send()


    } catch (error) {
        return res.status(400).json(error.message)
    }

};

const excluirProduto = async (req, res) => {
    const { id } = req.params
    const { usuarios } = req

    try {
        const produto = await conexao.query('select * from produtos where usuario_id = $1 and id = $2', [usuarios.id, id])

        if (produto.rowCount === 0) {
            return res.status(400).json(`Não existe produto cadastrado com o ID ${id}`)
        }

        const query = 'delete from produtos where id = $1'
        const produtoExcluido = await conexao.query(query, [id])


        return res.status(200).send()

    } catch (error) {
        return res.status(400).json(error.message)
    }
};

module.exports = {
    cadastrarProduto,
    listarProduto,
    detalharProduto,
    atualizarProduto,
    excluirProduto
}