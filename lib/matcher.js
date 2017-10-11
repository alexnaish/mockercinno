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
		let hasMatch = false;

		for (let mockKey in mock.request.query) {
			let match;
			let mockQuery = mock.request.query[mockKey];
			let requestQuery = request.query[mockKey];

			if (mockQuery instanceof RegExp) {
				match = requestQuery && mockQuery.test(requestQuery);
			} else {
				match = requestQuery === mockQuery;
			}

			if (match) {
				hasMatch = true;
				break;
			}
		}

		return hasMatch;
	},
	body: (mock, request) => {
		return _some([request.body], mock.request.body);
	}
};
