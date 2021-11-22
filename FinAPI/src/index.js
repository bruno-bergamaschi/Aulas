const express = require('express');
// A biblioteca UUID irá gerar um ID uníco. A V4 garante que seja aleatório.
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());

const customers = [];

// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
	const { cpf } = request.headers;
	// Verifica se o CPF informado está cadastrado
	const customer = customers.find((customer) => customer.cpf === cpf);

	// Caso não exista, retorna erro 400 com a mensagem 'Customer not found!'
	if (!customer) {
		return response.status(400).json({ error: 'Customer not found!' });
	}

	// Retorna o customer para a rota
	request.customer = customer;

	// Caso a verificação seja válida, o next() permite a rota avançar, dando continuidade
	return next();
}

function getBalance(statement) {
	const balance = statement.reduce((acc, operation) => {
		if (operation.type === 'credit') {
			return acc + operation.amount;
		} else {
			return acc - operation.amount;
		}
	}, 0);

	return balance;
}

app.post('/account', (request, response) => {
	const { cpf, name } = request.body;
	const custumerAlreadyExists = customers.some((customers) => customers.cpf === cpf);

	if (custumerAlreadyExists) {
		return response.status(400).json({ error: 'Customer already exists!' });
	}

	customers.push({
		cpf,
		name,
		id: uuidv4(),
		statement: []
	});

	return response.status(201).send();
});

// Utilizando o Middleware no app.use, todas as rotas abaixo dele terão a verificação.
// app.use(verifyIfExistsAccountCPF);

// Utilizando o Middleware como parâmentro (pode ser adicionado mais de um, EX: verifyIfExistsAccountCPF, middleware2, middleware3)
// apenas essa rota irá utilizar a verificação

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
	// Desestrutura o customer de dentro do request, podendo então utiliza-lo
	const { customer } = request;

	return response.json(customer.statement);
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
	const { description, amount } = request.body;
	const { customer } = request;
	const statementOperation = {
		description,
		amount,
		created_at: new Date(),
		type: 'credit'
	};

	customer.statement.push(statementOperation);

	return response.status(201).send();
});

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
	const { amount } = request.body;
	const { customer } = request;
	const balance = getBalance(customer.statement);

	if (balance < amount) {
		return response.status(400).json({ error: 'Insufficient funds!' });
	}

	const statementOperation = {
		amount,
		created_at: new Date(),
		type: 'debit'
	};

	customer.statement.push(statementOperation);

	return response.status(201).send();
});

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
	const { customer } = request;
	const { date } = request.query;

	const dateFormat = new Date(date + ' 00:00');

	const statement = customer.statement.filter(
		(statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString()
	);

	return response.json(statement);
});

app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
	const { name } = request.body;
	const { customer } = request;

	customer.name = name;

	return response.status(201).send();
});

app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
	const { customer } = request;

	return response.json(customer);
});

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
	const { customer } = request;

	const indexCustumer = customers.findIndex((custumerIndex) => custumerIndex.cpf === customer.cpf);

	customers.splice(indexCustumer, 1);

	return response.status(200).json(customers);
});

app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
	const { customer } = request;
	const balance = getBalance(customer.statement);
	return response.json(balance);
});

app.listen(3030);
