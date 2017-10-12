module.exports = [
    {
        name: 'Delayed Example',
        request: {
            method: 'GET',
            path: '/delayed',
        },
        response: {
            status: 200,
            delay: 4000,
            body: {
                response_time: '4000ms'
            }
        }
    }
];
