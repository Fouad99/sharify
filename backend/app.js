const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setting up parser
app.use(bodyParser.urlencoded({extended: false}));

app.listen(5000, () => {
	console.log('Connected server');	
});
