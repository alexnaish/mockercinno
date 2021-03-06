const path = require('path');

const logger = require('./logger');

const addMetadata = (res, filepath) => {
	if (res.constructor === Array) {
		return res.map(item => {
			item.file = filepath;
			return item;
		});
	} else {
		res.file = filepath;
		return res;
	}
};

module.exports = {
	import: (filePath, { strict = false } = {}) => {
		try {
			const fileContents = require(path.join(process.cwd(), filePath));
			let data = typeof fileContents === 'string' ? JSON.parse(fileContents) : fileContents;
			data = addMetadata(data, filePath);
			return data;
		} catch (err) {
			logger.error(`Failed to parse "${filePath}"`);
			if (strict) {
				throw err;
			}
		}
	},
	clearCache: filePath => {
		delete require.cache[require.resolve(path.join(process.cwd(), filePath))];
	}
};
