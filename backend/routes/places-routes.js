const express = require('express');
const placesControllers = require('../controllers/places-controller');
const router = express.Router();



router.get('/user/:uid', placesControllers.getPlaceByUserId);

router.get('/:pid', placesControllers.getPlaceById);

router.post('/', placesControllers.createPlace);

router.patch('/:pid', placesControllers.updatePlaceById);

router.delete('/:pid', placesControllers.deletePlaceById);




module.exports = router;