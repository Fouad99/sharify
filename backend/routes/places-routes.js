const express = require('express');
const HttpError = require('../models/http-error');

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

router.get('/user/:uid', (req, res, next) => {
    console.log('Get request in places/user');
    const uid = req.params.uid;
    const place = DUMMY_DATA.find(p => {
        return p.creator === uid;
    });
    if (!place) {


        return next(new HttpError('Could not find a place with the provided user Id', 404));
    }

    res.status(200).json({ place });
})

router.get('/:pid', (req, res, next) => {
    console.log('GET request in Places');
    const pid = req.params.pid;
    const place = DUMMY_DATA.find(p => {
        return p.id === pid;
    });

    if (!place) {

        return next(new HttpError('Could not find a place with the provided place Id', 404));

    }
    res.status(200).json({ place });
});



module.exports = router;