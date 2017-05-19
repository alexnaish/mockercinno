const Datastore = require('nedb');
const db = new Datastore();

module.exports = {
	register: (request, mock) => {
		return new Promise((resolve, reject) => {
			db.insert({
				request,
				mock
			}, (err, results) => {
				if (err) {
					return reject(err);
				}
				return resolve(results);
			});
		});
	},
	list: () => {
		return new Promise((resolve, reject) => {
			db.find({}, (err, results) => {
				if (err) {
					return reject(err);
				}
				return resolve(results);
			});
		});
	}
};
