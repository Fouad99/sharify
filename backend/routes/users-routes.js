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

router.get('/:uid', (req, res, next) => {
    console.log('Get request in users');
    const uid = req.params.uid;
    const place = DUMMY_DATA.find(p => {
        return p.creator === uid;
    })
    res.status(200).json({ place });
});

module.exports = router;