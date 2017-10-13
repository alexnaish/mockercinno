const path = require('path');
const minimatch = require('minimatch');
const route = require('path-match')();
const logger = require('./logger');

function matcher (requestKey) {
	return (mock, request) => {
		const schema = mock.request[requestKey] || {};
		return Object.keys(schema).reduce((res, key) => {
			let match;

			if (typeof schema[key] === 'object') {
				switch (schema[key].type) {
					case 'regex':
						match = new RegExp(schema[key].value, schema[key].modifiers || '').test(request[requestKey][key]);
						break;
					default:
						logger.error(`Invalid type specified for ${mock.name}.${requestKey}.${key}`);
						match = true;
				}
			} else {
				match = schema[key] === request[requestKey][key];
			}

			return match && res;
		}, true);
	};
}

module.exports = {
	path: (mock, request) => {
		return mock.request.path === request.path
			|| minimatch(request.path, mock.request.path)
			|| !!route(mock.request.path)(request.path);
	},
	headers: (mock, request) => {
		return matcher('headers')(mock, request);
	},
	query: (mock, request) => {
		return matcher('query')(mock, request);
	},
	body: (mock, request) => {
		return matcher('body')(mock, request);
	},
	custom: (mock, request) => {
		const custom = mock.request.custom;
		return require(path.resolve(process.cwd(), custom.function))(mock, request, ...(custom.additionalArgs || []));
	}
};
