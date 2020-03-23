const mongo = require('mongoose');

const ServicesSchema = new mongo.Schema({
	title: {
		type: String,
		min: 6,
		max: 255,
		required: [true, 'Please Enter title.']
	},
	mileage: {
		type: Number,
		min: 3,
		required: [true, 'Please enter a valid number.']
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongo.model('Services', ServicesSchema);
