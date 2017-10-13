module.exports = [
    {
        name: 'Function Matcher Example',
        request: {
            method: 'GET',
            path: '/function',
            custom: {
                function: 'matchers/example/exclusion',
                additionalArgs: ['anything', 'extra']
            }
        },
        response: {
            status: 200,
            body: {
                matcher: 'function',
                query: '{{query}}'
            }
        }
    }
];
