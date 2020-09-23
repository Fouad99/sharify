const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');

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

const getPlaceById = (req, res, next) => {
    const pid = req.params.pid;

    const place = DUMMY_DATA.find(p => {
        return p.id === pid;
    });

    if (!place) {

        return next(new HttpError('Could not find a place with the provided place Id', 404));

    }
    res.status(200).json({ place });
}

const getPlaceByUserId = (req, res, next) => {
    console.log('Get request in places/user');
    const uid = req.params.uid;
    const place = DUMMY_DATA.find(p => {
        return p.creator === uid;
    });
    if (!place) {


        return next(new HttpError('Could not find a place with the provided user Id', 404));
    }

    res.status(200).json({ place });
}

const createPlace = (req, res, next) => {

    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_DATA.push(createdPlace);
    res.status(201).json({ place: createdPlace });
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;