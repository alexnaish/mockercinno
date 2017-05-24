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
		return _some([request.query], mock.request.query);
	},
	body: (mock, request) => {
		return _some([request.body], mock.request.body);
	}
};
