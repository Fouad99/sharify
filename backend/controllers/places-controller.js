const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');

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

const updatePlaceById = (req, res, next) => {

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
