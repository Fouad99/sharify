const express = require('express');

const router = express.Router();

const DUMMY_DATA = [
    {
        id: 'p1',
        title: 'Eiffel tower',
        description: 'French monument',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: 'Paris',
        creator: 'u1'
    }
];

router.get('/', (req, res, next) => {
    console.log('GET request in Places');
    res.status(200).json({
        message: 'It works'
    });
});

module.exports = router;