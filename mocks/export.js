module.exports = [
	{
		request: {
			method: 'GET',
			path: '/export/*'
		},
		response: {
			status: 200,
			body: new Date()
		}
	}
];
