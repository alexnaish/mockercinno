const _some = require('lodash/some');
const minimatch = require('minimatch');
const route = require('path-match')();
const logger = require('./logger');

module.exports = {
	path: (mock, request) => {
		return mock.request.path === request.path
			|| minimatch(request.path, mock.request.path)
			|| !!route(mock.request.path)(request.path);
	},
	headers: (mock, request) => {
		return _some([request.headers], mock.request.headers);
	},
	query: (mock, request) => {
		let matches = 0;
		let mockQueryParams = 0;

		for (let mockKey in mock.request.query) {
			let mockQuery = mock.request.query[mockKey];
			let requestQuery = request.query[mockKey];

			mockQueryParams++;

			if (!requestQuery) {
				continue;
			}

			let mockRegex;

			if (typeof mockQuery === 'object') {
				switch (mockQuery.type) {
					case 'regex':
						mockRegex = new RegExp(mockQuery.value, mockQuery.modifiers || '');
						break;
					default:
						logger.error(`Invalid type specified for ${mockKey}`);
						continue;
				}
			}

			if ( (mockRegex && mockRegex.test(requestQuery)) || requestQuery === mockQuery ) {
				matches++;
			}
		}

		return matches === mockQueryParams;
	},
	body: (mock, request) => {
		return _some([request.body], mock.request.body);
	}
};
