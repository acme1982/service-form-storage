const mongo = require('mongoose');

const UserSchema = new mongo.Schema({
	username: {
		type: String,
		min: 6,
		max: 255,
		required: [true, 'Please enter username']
	},
	password: {
		type: String,
		min: 6,
		max: 1025,
		required: [true, 'Please enter valid password.']
	},
	email: {
		type: String,
		min: 6,
		max: 255,
		required: [true, 'Please enter valid Email.']
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongo.model('Users', UserSchema);
