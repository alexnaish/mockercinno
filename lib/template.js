const _get = require('lodash/get');

module.exports = (template) => {

	const isJson = typeof template === 'object';
	let _template = isJson ? JSON.stringify(template) : template;

	return {
		compile: parameters => {
			const compiled = _template.replace(/\{\{([a-z.\-\d\'\"\[\]]*)\}\}/gi, (_, key) => {
				const variable = _get(parameters, key);
				return typeof variable === 'object' ? JSON.stringify(variable) : variable;
			});

			// If it is JSON, ensure any objects templated are sanitised
			_template = isJson ? compiled.replace(/\"\{/g, '{').replace(/\}\"/g, '}') : compiled;
		},
		isJson: () => isJson,
		render: () => {
			return isJson ? JSON.parse(_template) : _template;
		}
	};

};
