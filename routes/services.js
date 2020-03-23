const express = require('express');
const router = express.Router();
const verifyToken = require('../routes/verifyToken');
const {
	getServices,
	createService,
	getSingleService,
	deleteService
} = require('../controllers/services');

router.route('/').get(getServices);
router.route('/').post(verifyToken, createService);
router.route('/:id').get(getSingleService);
router.route('/:id').delete(verifyToken, deleteService);

module.exports = router;
