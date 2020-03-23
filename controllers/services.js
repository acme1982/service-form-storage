const Service = require('../models/Service');

// @desc    Get all services.
// @route  GET /api/v1/services
// @access public
exports.getServices = async (req, res, next) => {
	try {
		const services = await Service.find();
		return res.status(200).json({
			success: true,
			data: services
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Server error.'
		});
	}
};

// @desc    Get all services.
// @route  POST /api/v1/services
// @access public
exports.createService = async (req, res, next) => {
	try {
		const service = await Service.create({
			title: req.body.title,
			mileage: req.body.mileage
		});
		return res.status(201).json({
			success: true,
			data: service
		});
	} catch (err) {
		if (err.name === 'ValidationError') {
			const message = Object.values(err.errors).map(err => err.message);
			return res.status(400).json({
				success: false,
				message: message
			});
		} else {
			return res.status(500).json({
				success: false,
				message: 'Server error.'
			});
		}
	}
};

// @desc find single Service.
// @route GET /api/v1/services/:id
// @access public
exports.getSingleService = async (req, res, next) => {
	const requestedID = req.params.id;
	try {
		const service = await Service.findById(requestedID);

		if (!service) {
			return res.status(404).json({
				success: false,
				message: `This id: ${requestedID} not found.`
			});
		} else {
			return res.status(200).json({
				success: true,
				data: service
			});
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Server error.'
		});
	}
};

// @desc Delete service by id.
// @route DELETE /api/v1/services/:id
// @access public
exports.deleteService = async (req, res, next) => {
	const requestedID = req.params.id;

	try {
		// collection.remove deprecated use deleteOne or others.
		const service = await Service.deleteOne({ _id: requestedID });
		if (!service) {
			return res.status(404).json({
				success: false,
				message: `This id: ${requestedID} does not exist.`
			});
		} else {
			return res.status(200).json({
				success: true,
				message: `Successfully deleted id: ${requestedID}`
			});
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Server error.'
		});
	}
};
