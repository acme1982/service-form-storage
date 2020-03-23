const jwt = require('jsonwebtoken');

// Middleware - for checking token.
module.exports = (req, res, next) => {
	// Check if the header exist.
	const token = req.header('auth-token');
	if (!token) {
		return next(
			res.status(401).json({
				success: false,
				message: 'Access denied.'
			})
		);
	}
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		// req.user = user._id and it is available for access.
		req.user = verified;
		next();
	} catch (err) {
		return next(
			res.status(400).json({
				success: false,
				message: 'Bad token.'
			})
		);
	}
};
