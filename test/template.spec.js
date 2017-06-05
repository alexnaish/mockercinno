const Template = require('../lib/template');

describe('Template', () => {

	test('should take a parameter and return correct methods', () => {
		const templateObject = Template('test');

		expect(templateObject).toHaveProperty('isJson');
		expect(templateObject).toHaveProperty('render');
		expect(templateObject).toHaveProperty('compile');
	});

	describe('isJson', () => {

		test('should return false when param is a string', () => {
			const templateObject = Template('test');
			expect(templateObject.isJson()).toBe(false);
		});

		test('should return true when param is an object', () => {
			const templateObject = Template({ test: true });
			expect(templateObject.isJson()).toBe(true);
		});

	});

});
