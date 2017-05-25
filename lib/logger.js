const logger = require('pino')();

const log = (level, ...params) => {
	logger[level](...params);
};

module.exports = {
	info: (...params) => {
		log('info', ...params);
	},
	warning: (...params) => {
		log('warning', ...params);
	},
	error: (...params) => {
		log('error', ...params);
	}
};
