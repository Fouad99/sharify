const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');



const app = express();

// Setting up parser
app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
	const error = new HttpError('Could not find proper route', 404);
	next(error);
});


app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code);
	res.json({ message: error.message || 'An unknown error occured!' })
});



mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('DB connected !');
		app.listen(5000);
		console.log('Server connected !');
	})
	.catch(err => {
		console.log('Cannot connect to DB, therefore no server connection established');
	});

