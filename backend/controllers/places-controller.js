const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const Place = require('../models/place');

let DUMMY_DATA = [
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

const getPlaceById = async (req, res, next) => {
    const pid = req.params.pid;
    let place;

    try {

        const place = await Place.findById(pid);

    } catch (err) {
        error = new HttpError('Something went off, no place found', 500);
        return next(error);
    }

    if (!place) {

        const error = new HttpError('Could not find a place with the provided place Id', 404);
        return next(error);

    }
    res.status(200).json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = (req, res, next) => {
    const uid = req.params.uid;
    const places = DUMMY_DATA.filter(p => {
        return p.creator === uid;
    });
    if (!places || places.lenght === 0) {


        return next(new HttpError('Could not find places with the provided user Id', 404));
    }

    res.status(200).json({ place });
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs', 422));
    }
    const { title, description, address, creator } = req.body;

    const createdPlace = new Place({
        title,
        description,
        address,
        image: 'https://i.pinimg.com/originals/a1/82/d8/a182d8a7c59acbf506d2f7f329105c74.jpg',
        creator
    });

    try {
        await createdPlace.save();

    } catch (err) {
        const error = new HttpError(
            'Creating place didn t work',
            500
        );
        return next(error);
    }
    res.status(201).json({ place: createdPlace });
}

const updatePlaceById = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs', 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...DUMMY_DATA.find(p => p.id === placeId) };
    const placeIndex = DUMMY_DATA.findIndex(p => p.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_DATA[placeIndex] = updatedPlace;
    res.status(200).json({ place: updatedPlace });
}

const deletePlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_DATA = DUMMY_DATA.filter(p => p.id !== placeId);
    res.status(200).json({ message: "item deleted" });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;