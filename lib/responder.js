const _map = require('lodash/mapKeys');
const route = require('path-match')();

const Template = require('./template');

const properties = [
	{
		key: 'headers',
		method: 'set'
	},
	{
		key: 'cookies',
		method: 'cookie'
	}
];

module.exports = (mock, request, response) => {

	const parameters = {
		params: route(mock.request.path)(request.path),
		query: request.query,
		headers: request.headers,
		body: request.body,
		mock: mock
	};

	properties.map(prop => {
		if (mock.response[prop.key]){
			_map(mock.response[prop.key], (value, key) => response[prop.method](key, value));
		}
	});

	let template = Template(mock.response.body);
	template.compile(parameters);

	const renderFunction = template.isJson() ? 'json' : 'send';

	if (mock.response.delay) {
		return setTimeout(() => {
			return response.status(mock.response.status)[renderFunction](template.render());
		}, mock.response.delay);
	}
	return response.status(mock.response.status)[renderFunction](template.render());

};
