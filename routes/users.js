const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getUser,
} = require('../controllers/usersController');
const verifyToken = require('./verifyToken');

// Set User routes.
router.route('/register').post(verifyToken, registerUser);
router.route('/login').post(loginUser);
router.route('/user').get(verifyToken, getUser);

module.exports = router;
