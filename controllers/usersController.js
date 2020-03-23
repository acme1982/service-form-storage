const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
	registerValidator,
	loginValidator
} = require('../routes/userValidation');

// @desc register user
// @route POST /api/v1/users
// @access private
exports.registerUser = async (req, res, next) => {
	const error = registerValidator(req.body);
	// Error comes from userValidation
	if (error) {
		return next(
			res.status(400).json({
				success: false,
				message: error
			})
		);
	}
	// Check if email exist in a DB.
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {
		return res
			.status(400)
			.json({ success: false, message: 'Email already exist.' });
	}
	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	try {
		const user = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword
		});
		return res.status(201).json({
			success: true,
			message: `user ${user._id} saved successfully.`
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Server error.'
		});
	}
};

// @desc check if user logged In.
// @route POST /api/v1/users/login
// @access public
let wrongPassword = 0; // set a global variable to track how many times entered a wrong password. Resets after 3.
exports.loginUser = async (req, res, next) => {
	// Check if required fields are entered.
	const error = loginValidator(req.body);
	if (error) {
		return next(
			res.status(400).json({
				success: false,
				message: error
			})
		);
	}
	// Check if email exist in DB.
	const user = await User.findOne({
		email: req.body.email
	});
	if (!user) {
		return next(
			res.status(400).json({
				success: false,
				message: 'Email not found.'
			})
		);
	}
	try {
		const { password, username } = user;
		// Check for password.
		const isPassword = await bcrypt.compare(req.body.password, password);
		if (!isPassword) {
			// IF wrong 3 times do something... ATM it just set a delay for 3s.
			wrongPassword++;
			if (wrongPassword === 3) {
				return setTimeout(
					() =>
						res.status(401).json({
							success: false,
							message: 'Did you forgot your password?'
						}),
					3000,
					(wrongPassword = 0)
				);
			}

			return res.status(401).json({
				success: false,
				message: 'Wrong email and or password.'
			});
		} else {
			const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
			res.header('auth-token', token);
			return res.status(200).json({
				success: true,
				message: `Welcome back. ${username}`
			});
		}
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: 'Server Error.'
		});
	}
};
