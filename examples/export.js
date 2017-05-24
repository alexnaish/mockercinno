module.exports = [
	{
		name: 'JS Export',
		request: {
			method: 'GET',
			path: '/export/*'
		},
		response: {
			status: 200,
			body: {
				date: new Date()
			}
		}
	}
];
