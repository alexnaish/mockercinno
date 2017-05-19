const _get = require('lodash/get');
const _map = require('lodash/mapKeys');
const route = require('path-match')();

module.exports = (mock, request, response) => {

	const parameters = {
		params: route(mock.request.path)(request.originalUrl),
		query: request.query,
		headers: request.headers,
		body: request.body,
		mock: mock
	};

	if (mock.response.headers) {
		_map(mock.response.headers, (value, key) => {
			response.set(key, value);
		});
	}

	if (mock.response.cookies) {
		_map(mock.response.cookies, (value, key) => {
			response.cookie(key, value);
		});
	}

	let templateJson = JSON.stringify(mock.response.body).replace(/\{\{([a-z.\-\d\'\"\[\]]*)\}\}/gi, (_, key) => {
		const variable = _get(parameters, key);
		return typeof variable === 'object' ? JSON.stringify(variable) : variable;
	}).replace(/\"\{/g, '{').replace(/\}\"/g, '}');

	return response.status(mock.response.status).json(JSON.parse(templateJson));
};
