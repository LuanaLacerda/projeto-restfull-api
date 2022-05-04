![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 3 - Back-end

Seu papel é construir uma RESTful API que permita:

-   Fazer Login
-   Cadastrar Usuário
-   Detalhar Usuário
-   Editar Usuário
-   Listar produtos
-   Detalhar produtos
-   Cadastrar produtos
-   Editar produtos
-   Remover produtos


## **Banco de dados**

Você precisa criar um Banco de Dados PostgreSQL chamado `market_cubos` contendo as seguintes tabelas e colunas:  
**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

-   usuarios
    -   id
    -   nome
    -   nome_loja (o nome da loja deste vendedor)
    -   email (campo único)
    -   senha
-   produtos
    -   id
    -   usuario_id
    -   nome
    -   quantidade
    -   categoria
    -   preco
    -   descricao
    -   imagem (campo texto para URL da imagem na web)

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

---

### **Validações do token**

-   **REQUISITOS OBRIGATÓRIOS**
    -   Validar se o token foi enviado no header da requisição (Bearer Token)
    -   Verificar se o token é válido
    -   Consultar usuário no banco de dados pelo id contido no token informado

### **Detalhar usuário**

#### `GET` `/usuario`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.


### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

### **Listar produtos do usuário logado**

#### `GET` `/produtos`

Essa é a rota que será chamada quando o usuario logado quiser listar todos os seus produtos cadastrados.  
**Lembre-se:** Deverão ser retornados **apenas** produtos associados ao usuário logado, que deverá ser identificado através do ID presente no token de validação.  

### **Detalhar um produto do usuário logado**

#### `GET` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter um dos seus produtos cadastrados.  
**Lembre-se:** Deverá ser retornado **apenas** produto associado ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

### **Cadastrar produto para o usuário logado**

#### `POST` `/produtos`

Essa é a rota que será utilizada para cadastrar um produto associado ao usuário logado.  
**Lembre-se:** Deverá ser possível cadastrar **apenas** produtos associados ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

### **Atualizar produto do usuário logado**

#### `PUT` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar um dos seus produtos cadastrados.  
**Lembre-se:** Deverá ser possível atualizar **apenas** produtos associados ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

### **Excluir produto do usuário logado**

#### `DELETE` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir um dos seus produtos cadastrados.  
**Lembre-se:** Deverá ser possível excluir **apenas** produtos associados ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.  


### Linguagem, framework e/ou tecnologias usadas
NodeJs
Javascript
PostgreSQL
ExpressJs




###### tags: `back-end` `módulo 3` `nodeJS` `PostgreSQL` `API REST` `desafio`
