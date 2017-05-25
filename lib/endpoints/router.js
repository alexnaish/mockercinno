const express = require('express');
const router = express.Router();

const api = require('./api');

router.route('/__list')
	.get(api.listMocks);

router.route('/__requests')
	.get(api.listRequests);

router.route('/__refresh')
	.post(api.refresh);

module.exports = router;
