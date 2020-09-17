const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes')



const app = express();

// Setting up parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/places', placesRoutes);



app.listen(5000, () => {
	console.log('Connected server');
});
