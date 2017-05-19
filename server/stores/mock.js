const Datastore = require('nedb');
const db = new Datastore();

const matcher = require('../matcher');

module.exports = {
	list: (search) => {
		return new Promise((resolve, reject) => {
			db.find(search, { _id: 0 }, (err, results) => {
				if (err) {
return reject(err);
}
				return resolve(results);
			});
		});
	},
	insert: (mocks) => {
		db.insert(mocks);
	},
	find: (request) => {
		return new Promise((resolve, reject) => {
			db.findOne({
				'request.method': request.method,
				$and: [
					{
						$where: function () {
							return matcher.path(this, request);
						}
					},
					{
						$where: function () {
							return matcher.headers(this, request);
						}
					},
					{
						$where: function () {
							return matcher.query(this, request);
						}
					},
					{
						$where: function () {
							return matcher.body(this, request);
						}
					}
				]
			}, { _id: 0 }, (err, results) => {
				if (err) {
return reject(err);
}
				return resolve(results);
			});
		});
	}
};
