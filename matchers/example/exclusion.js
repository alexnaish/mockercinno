module.exports = (mock, request, ...args) => {
    return !args.includes(request.query.test);
};
