// importação do express
const express = require('express');

// criação de constante para chamar a função do express
const app = express();

// Middleware para permitir utilização de JSON no express
app.use(express.json());

/**
 * GET - Buscar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação específica no servidor (Ex: apenas avatar ou email)
 * DELETE - Deletar uma informação no servidor
 */

/**
 *  Tipos de parâmetros:
 * 
 *  Route Params => Identificar um recurso para editar/deletar/buscar
 *  Query Params => Paginação / Filtro 
 *  Body Params => Objetos para inserção/alteração de recursos (JSON)
 */

//request: Tudo que recebemos na requisição
//response: tudo que retornamos na reposição

// Busca os cursos no servidor
app.get('/courses', (request, response) => {
	// Exemplo de Query Params
	const query = request.query;
	console.log(query);
	return response.json([ 'Curso 1', 'Curso 2', 'Curso 3' ]);
});

// Realiza o cadastro de novos cursos
app.post('/courses', (request, response) => {
	// Exemplo de Body Params
	const body = request.body;
	console.log(body);
	return response.json([ 'Curso 1', 'Curso 2', 'Curso 3', 'Curso 4' ]);
});

// Recebe um ID e altera o curso de referência (EX: Curso 1 alterado para Curso 6)
app.put('/courses/:id', (request, response) => {
	// Exemplo de Route Params
	const { id } = request.params;
	console.log(id);
	return response.json([ 'Curso 6', 'Curso 2', 'Curso 3', 'Curso 4' ]);
});

// Recebe um ID e altera o curso de referência (EX: Curso 2 alterado para Curso 7)
app.patch('/courses/:id', (request, response) => {
	return response.json([ 'Curso 6', 'Curso 7', 'Curso 3', 'Curso 4' ]);
});

// Recebe um ID e deleta o curso de referência (EX: Curso 3 deletado)
app.delete('/courses/:id', (request, response) => {
	return response.json([ 'Curso 6', 'Curso 7', 'Curso 4' ]);
});

// porta para startar o express
// Listen que irá startar através de uma porta, EX: localhost:3333
app.listen(3030);
