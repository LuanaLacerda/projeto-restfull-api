const jwt = require('jsonwebtoken');
const jwtSecret = require('../controladores/jwt_secret');
const conexao = require('../conexao');

async function verificarToken(req, res, next) {

    try {
        const body = req.header('authorization')
        const token = (body.split(' ')[1])

        const { id } = jwt.verify(token, jwtSecret)


        const query = 'select * from usuarios where id = $1';
        const { rows, rowCount } = await conexao.query(query, [id])

        if (rowCount === 0) {
            return res.status(404).json("O usuário não foi encontrado")
        }

        const usuarios = rows[0]
        req.usuarios = usuarios

        next()

    } catch (error) {
        return res.status(401).json({ "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
}

module.exports = verificarToken 