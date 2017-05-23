const express = require('express');
const bodyParser = require('body-parser');
const logger = require('pino')();

const responder = require('./responder');
const mockStore = require('./stores').mock;
const requestStore = require('./stores').request;

const app = express();

app.use(bodyParser.json());

app.get('/favicon.ico', function(request, response) {
    return response.sendStatus(204);
});

app.get('/__list', (request, response) => {
	const search = request.query.path ? { 'request.path': new RegExp(request.query.path) } : {} ;
	mockStore.list(search)
		.then(results => {
			response.status(200).json(results);
		})
		.catch(err => {
			logger.error('err', err);
			return response.status(500).json({});
		});
});

app.get('/__requests', (request, response) => {
	requestStore.list()
		.then(results => {
			return response.status(200).json(results);
		})
		.catch(err => {
			logger.error('err', err);
			return response.status(500).json({});
		});
});

app.all('*', (request, response) => {
	mockStore.find(request)
		.then(mock => {
			if (mock) {
        process.env.DEBUG && logger.error('200', request.originalUrl, mock.request);
				return responder(mock, request, response);
			} else {
        process.env.DEBUG && logger.error('404', request.originalUrl, { query: request.query, headers: request.headers, body: request.body });
				return response.status(404).json({});
			}
		})
		.catch(err => {
			logger.error('err', err);
			return response.status(500).json({});
		});

});

module.exports = app;
