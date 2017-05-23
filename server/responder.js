const parse = require('url').parse;

const _map = require('lodash/mapKeys');
const route = require('path-match')();

const Template = require('./template');

module.exports = (mock, request, response) => {

	const parameters = {
		params: route(mock.request.path)(parse(request.originalUrl).pathname),
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

	let template = Template(mock.response.body);
	template.compile(parameters);

	const renderFunction = template.isJson() ? 'json' : 'send';
	return response.status(mock.response.status)[renderFunction](template.render());

};
