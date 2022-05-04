const conexao = require('../conexao');
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwt_secret');



const pwd = securePassword()

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;

    if (!nome) {
        return res.status(400).json('O campo nome é obrigatório.')
    }
    if (!email) {
        return res.status(400).json('O campo e-mail é obrigatório.')
    }

    if (!senha) {
        return res.status(400).json('O campo senha é obrigatório.')
    }

    if (!nome_loja) {
        return res.status(400).json('O campo nome da loja é obrigatório.')
    }

    try {
        const query = 'select * from usuarios where email = $1'
        const usuario = await conexao.query(query, [email])

        if (usuario.rowCount > 0) {
            return res.status(400).json('E-mail já cadastrado.')
        }

    } catch (error) {
        return res.status(400).json(error.message)
    }

    try {
        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");

        const query = 'insert into usuarios (nome, email, senha,nome_loja) values ($1, $2, $3, $4)'
        const usuario = await conexao.query(query, [nome, email, hash, nome_loja]);

        if (usuario.rowCount === 0) {
            return res.status(400).json('Não foi possivel cadastrar usuário')
        }

        return res.status(200).json("Usuário cadastrado com sucesso")

    } catch (error) {
        return res.status(400).json(error.message)
    }

};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(400).json('O campo e-mail é obrigatório')
    }
    if (!senha) {
        return res.status(400).json('O campo senha é obrigatório')
    }

    try {
        const query = 'select * from usuarios where email = $1'
        const usuarios = await conexao.query(query, [email]);

        if (usuarios.rowCount === 0) {
            return res.status(400).json('E-mail ou senha incorretos.')
        }

        const usuario = usuarios.rows[0]

        const result = await pwd.verify(Buffer.from(senha), Buffer.from(usuario.senha, "hex"))

        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json('E-mail ou senha incorretos.')
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:

                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex")
                    const query = 'update usuarios set senha = $1 where email = $2 '
                    await conexao.query(query, [hash, email]);

                } catch {
                }
                break
        }

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nome_loja: usuario.nome_loja
        }, jwtSecret, {
            expiresIn: '2h'
        })

        return res.send(token)

    } catch (error) {
        return res.status(400).json(error.message)
    }


};

const detalharUsuario = async (req, res) => {


    try {
        const { usuarios } = req

        const { senha, ...usuario } = usuarios

        return res.send(usuario)



    } catch (error) {
        return res.status(400).json(error)

    }

};

const atualizarUsuario = async (req, res) => {

    try {

        const { usuarios } = req
        const { nome, email, senha, nome_loja } = req.body;

        if (!nome) {
            return res.status(400).json('O campo nome é obrigatório.')
        }
        if (!email) {
            return res.status(400).json('O campo e-mail é obrigatório.')
        }

        if (!senha) {
            return res.status(400).json('O campo senha é obrigatório.')
        }

        if (!nome_loja) {
            return res.status(400).json('O campo nome da loja é obrigatório.')
        }


        const query = 'select * from usuarios where email = $1'
        const usuario = await conexao.query(query, [email])


        if (usuario.rowCount > 1) {
            return res.status(400).json('E-mail já cadastrado.')
        }

        if (usuario.rows[0].email !== email) {
            return res.status(400).json('E-mail já cadastrado.')
        }



        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
        const queryAtualizar = 'update usuarios set nome = $1, email = $2, senha = $3, nome_loja = $4 where id = $5'
        await conexao.query(queryAtualizar, [nome, email, hash, nome_loja, usuarios.id])

        return res.status(200).send()







    } catch (error) {
        return res.status(400).json(error.message)

    }
};


module.exports = {
    cadastrarUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario
}