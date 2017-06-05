const _union = require('lodash/union');

const mockStore = require('../stores').mock;
const requestStore = require('../stores').request;
const logger = require('../logger');
const manager = require('../manager');

module.exports = {
	listMocks: (request, response) => {
		const search = request.query.path ? { 'request.path': new RegExp(request.query.path) } : {} ;
		mockStore.list(search)
			.then(results => {
				response.status(200).json(results);
			})
			.catch(err => {
				logger.error('err', err);
				return response.status(500).json({});
			});
	},
	listRequests: (request, response) => {
		requestStore.list()
			.then(results => {
				return response.status(200).json(results);
			})
			.catch(err => {
				logger.error('err', err);
				return response.status(500).json({});
			});
	},
	refresh: (request, response) => {
		mockStore.list(request.body)
			.then(results => {
				if (!results.length) {
					return response.status(400).json({
						error: 'No mocks match criteria'
					});
				}
				mockStore.reset(request.body);

				const uniqueFiles = _union(results.map(mock => mock.file));
				uniqueFiles.map(filePath => {
					manager.clearCache(filePath);
					mockStore.insert(manager.import(filePath));
				});

				response.status(200).json({ files: uniqueFiles });
			})
			.catch(err => {
				logger.error('err', err);
				return response.status(500).json({});
			});
	},
	goodToGo: (request, response) => {
		response.sendStatus(200);
	}
};
