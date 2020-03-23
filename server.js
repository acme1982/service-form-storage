const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config({ path: './config/.env' });
const services = require('./routes/services');
const users = require('./routes/users');
const connectDB = require('./config/mongoDB');
const cors = require('cors');
// connect to mongoDB.
connectDB();

const app = express();
// Set Middleware.
// Set body parser (to get request as Json).
app.use(cors());
app.use(express.json());
// set default route for services.
app.use('/api/v1/services', services);
app.use('/api/v1/users', users);
// get port from env file or 8080.
const PORT = process.env.PORT || 8080;
// Start server
app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.SERVER_MODE} on port: ${PORT}`.yellow
			.bold
	)
);
