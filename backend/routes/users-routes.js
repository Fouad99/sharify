const express = require('express');
const HttpError = require('../models/http-error');

const userControllers = require('../controllers/users-controller');


const router = express.Router();



router.get('/', userControllers.getUsers);

router.post('/signup', userControllers.signup);

router.post('/login', userControllers.login);



module.exports = router;