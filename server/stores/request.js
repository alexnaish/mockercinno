const Datastore = require('nedb');
const db = new Datastore();

module.exports = {
	register: (request, mock) => {
		db.insert({
			request,
			mock
		});
	}
};
