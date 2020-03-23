const Joi = require('@hapi/joi');

// Validate user fields before submit.
exports.registerValidator = data => {
	const schema = Joi.object({
		username: Joi.string()
			.min(4)
			.max(255)
			.required(),

		email: Joi.string()
			.email()
			.required(),

		password: Joi.string()
			.min(6)
			.max(1024)
			.required()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
	});
	const { error } = schema.validate(data);
	if (error) {
		return error.message;
	}
	return undefined;
};
// Validate user fields before submit.
exports.loginValidator = data => {
	const schema = Joi.object({
		email: Joi.string()
			.email()
			.required(),

		password: Joi.string()
			.min(6)
			.max(1024)
			.required()
	});
	const { error } = schema.validate(data);
	if (error) {
		return error.message;
	}
	return undefined;
};
