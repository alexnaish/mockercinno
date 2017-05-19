const matchers = require('../server/matcher');

describe('Matchers', () => {

	describe('path', () => {

		let mock;
		let request;

		beforeEach(() => {
			mock = {
				request: {
					path: '/test'
				}
			};
			request = {
				originalUrl: '/test'
			};
		});

		test('should return true if request path exactly matches mock request path', () => {
			expect(matchers.path(mock, request)).toBe(true);
		});

		test('should return true if request path matches mock request greedy path', () => {
			mock.request.path = '/test/*';
			request.originalUrl = '/test/anything';

			expect(matchers.path(mock, request)).toBe(true);
		});

		test('should return true if request path matches mock request named path', () => {
			mock.request.path = '/test/:named/end';
			request.originalUrl = '/test/anything/end';

			expect(matchers.path(mock, request)).toBe(true);
		});

	});

	describe('headers', () => {

		let mock;
		let request;

		beforeEach(() => {
			mock = {
				request: {
					headers: {
						test: 'this'
					}
				}
			};
			request = {
				headers: {
					test: 'this'
				}
			};
		});

		test('should return true if request headers exactly match mock request headers', () => {
			expect(matchers.headers(mock, request)).toBe(true);
		});

		test('should return true if request headers contain the mock request headers', () => {
			request.headers.another = 'glah';

			expect(matchers.headers(mock, request)).toBe(true);
		});

		test('should return false if request headers do not match the mock request header values', () => {
			request.headers = {
				test: 'nope'
			};

			expect(matchers.headers(mock, request)).toBe(false);
		});

		test('should return false if request headers do not contain the mock request header values', () => {
			request.headers = {
				another: 'header'
			};

			expect(matchers.headers(mock, request)).toBe(false);
		});

	});

	describe('query', () => {

		let mock;
		let request;

		beforeEach(() => {
			mock = {
				request: {
					query: {
						test: 'this'
					}
				}
			};
			request = {
				query: {
					test: 'this'
				}
			};
		});

		test('should return true if request query exactly match mock request query', () => {
			expect(matchers.query(mock, request)).toBe(true);
		});

		test('should return true if request query contain the mock request query', () => {
			request.query.another = 'glah';

			expect(matchers.query(mock, request)).toBe(true);
		});

		test('should return false if request query does not match the mock request header values', () => {
			request.query = {
				test: 'nope'
			};

			expect(matchers.query(mock, request)).toBe(false);
		});

		test('should return false if request query does not contain the mock request header values', () => {
			request.query = {
				another: 'header'
			};

			expect(matchers.query(mock, request)).toBe(false);
		});

	});

	describe('body', () => {

		let mock;
		let request;

		beforeEach(() => {
			mock = {
				request: {
					body: {
						test: 'this'
					}
				}
			};
			request = {
				body: {
					test: 'this'
				}
			};
		});

		test('should return true if request body exactly match mock request body', () => {
			expect(matchers.body(mock, request)).toBe(true);
		});

		test('should return true if request body contain the mock request body', () => {
			request.body.another = 'glah';

			expect(matchers.body(mock, request)).toBe(true);
		});

		test('should return false if request body does not match the mock request header values', () => {
			request.body = {
				test: 'nope'
			};

			expect(matchers.body(mock, request)).toBe(false);
		});

		test('should return false if request body does not contain the mock request header values', () => {
			request.body = {
				another: 'header'
			};

			expect(matchers.body(mock, request)).toBe(false);
		});

	});

});
