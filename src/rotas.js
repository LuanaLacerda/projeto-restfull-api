const express = require('express');
const usuarios = require('./controladores/usuarios');
const produtos = require('./controladores/produtos');
const verificarToken = require('./intermediadores/verificarToken');


const rotas = express();



//usuarios
rotas.post('/usuario', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.loginUsuario);

rotas.use(verificarToken);

rotas.get('/usuario/', usuarios.detalharUsuario);
rotas.put('/usuario', usuarios.atualizarUsuario);



//produtos
rotas.get('/produtos', produtos.listarProduto);
rotas.get('/produtos/:id', produtos.detalharProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.excluirProduto);


module.exports = rotas