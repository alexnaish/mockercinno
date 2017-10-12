module.exports = [
    {
        name: 'Regex Example',
        request: {
            method: 'GET',
            path: '/regex',
            query: {
                email: {
                    type: 'regex',
                    value: '.*?@example\.com',
                    modifiers: 'i'
                }
            }
        },
        response: {
            status: 200,
            body: {
                supplied: '{{query.email}}'
            }
        }
    }
];
