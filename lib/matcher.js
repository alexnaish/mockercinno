const _some = require('lodash/some');
const minimatch = require('minimatch');
const route = require('path-match')();

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

			if ( (mockQuery instanceof RegExp && mockQuery.test(requestQuery)) || requestQuery === mockQuery ) {
				matches++;
			}
		}

		return matches === mockQueryParams;
	},
	body: (mock, request) => {
		return _some([request.body], mock.request.body);
	}
};
