const matcher = require('../lib/matcher');

describe('Matcher', () => {

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
				originalUrl: '/test?blah=test',
				path: '/test'
			};
		});

		test('should return true if request path exactly matches mock request path', () => {
			expect(matcher.path(mock, request)).toBe(true);
		});

		test('should return true if request path matches mock request greedy path', () => {
			mock.request.path = '/test/*';
			request.path = '/test/anything';

			expect(matcher.path(mock, request)).toBe(true);
		});

		test('should return true if request path matches mock request named path', () => {
			mock.request.path = '/test/:named/end';
			request.path = '/test/anything/end';

			expect(matcher.path(mock, request)).toBe(true);
		});

		test('should return false if request path does not match mock request named path', () => {
			mock.request.path = '/test/:named/end';
			request.path = '/this/will/never/match';

			expect(matcher.path(mock, request)).toBe(false);
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
			expect(matcher.headers(mock, request)).toBe(true);
		});

		test('should return true if request headers contain the mock request headers', () => {
			request.headers.another = 'glah';

			expect(matcher.headers(mock, request)).toBe(true);
		});

		test('should return false if request headers do not match the mock request header values', () => {
			request.headers = {
				test: 'nope'
			};

			expect(matcher.headers(mock, request)).toBe(false);
		});

		test('should return false if request headers do not contain the mock request header values', () => {
			request.headers = {
				another: 'header'
			};

			expect(matcher.headers(mock, request)).toBe(false);
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

		test('should return true if mock has no query specified', () => {
			delete mock.request.query;
			expect(matcher.query(mock, request)).toBe(true);
		});

		test('should return true if mock has empty query specified', () => {
			delete mock.request.query.test;
			expect(matcher.query(mock, request)).toBe(true);
		});

		test('should return true if request query exactly match mock request query', () => {
			expect(matcher.query(mock, request)).toBe(true);
		});

		test('should return true if request query contain the mock request query', () => {
			request.query.another = 'glah';

			expect(matcher.query(mock, request)).toBe(true);
		});

		test('should return false if request query does not match the mock request header values', () => {
			request.query = {
				test: 'nope'
			};

			expect(matcher.query(mock, request)).toBe(false);
		});

		test('should return false if request query does not contain the mock request header values', () => {
			request.query = {
				another: 'header'
			};

			expect(matcher.query(mock, request)).toBe(false);
		});

		test('RegExp - should return true if request query matches', () => {
			mock.request.query.email = {
				type: 'regex',
				value: '.*?@bar\.com'
			};

			request.query = {
				test: 'this',
				email: 'foo@bar.com'
			};

			expect(matcher.query(mock, request)).toBe(true);
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
			expect(matcher.body(mock, request)).toBe(true);
		});

		test('should return true if request body contain the mock request body', () => {
			request.body.another = 'glah';

			expect(matcher.body(mock, request)).toBe(true);
		});

		test('should return false if request body does not match the mock request header values', () => {
			request.body = {
				test: 'nope'
			};

			expect(matcher.body(mock, request)).toBe(false);
		});

		test('should return false if request body does not contain the mock request header values', () => {
			request.body = {
				another: 'field'
			};

			expect(matcher.body(mock, request)).toBe(false);
		});

	});

});
