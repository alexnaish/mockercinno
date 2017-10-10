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

			if (mockQuery instanceof RegExp) {
				match = _some(request.query, (query, key) => {
					return mockKey === key && mockQuery.test(query);
				});
			} else {
				match = _some(request.query, (query, key) => {
					return mockKey === key && request.query[key] === mock.request.query[key];
				});
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
