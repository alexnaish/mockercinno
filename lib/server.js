const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const logger = require('./logger');
const responder = require('./responder');
const mockStore = require('./stores').mock;
const endpointRouter = require('./endpoints/router');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/favicon.ico', function(request, response) {
    return response.sendStatus(204);
});

app.use(endpointRouter);

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
