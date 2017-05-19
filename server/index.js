const express = require('express');
const bodyParser = require('body-parser');
const logger = require('pino')();

const mockStore = require('./stores').mock;

const app = express();

app.use(bodyParser.json());

app.get('/favicon.ico', function(request, response) {
    return response.sendStatus(204);
});

app.get('/__list', (request, res) => {
	const search = request.query.path ? { 'request.path': new RegExp(request.query.path) } : {} ;
	mockStore.list(search)
		.then(results => {
			res.status(200).json(results);
		})
		.catch(err => {
			logger.error('err', err);
			return res.status(500).json({});
		});
});

app.all('*', (request, res) => {
	mockStore.find(request)
		.then(mock => {
			if (mock) {
				// mock.response.headers.map(header => {
				// 	res.set(header.key, header.value);
				// });
				return res.status(mock.response.status).json(mock);
			} else {
				return res.status(404).json({});
			}

		})
		.catch((err) => {
			logger.error('err', err);
			return res.status(500).json({});
		});

});

module.exports = app;
