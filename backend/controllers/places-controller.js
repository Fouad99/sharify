const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const Place = require('../models/place');

const getPlaceById = async (req, res, next) => {
    const pid = req.params.pid;
    let place;

    try {

        place = await Place.findById(pid);

    } catch (err) {
        const error = new HttpError('Something went off, no place found', 500);
        return next(error);
    }

    if (!place) {

        const error = new HttpError('Could not find a place with the provided place Id', 404);
        return next(error);

    }
    res.status(200).json({ place: place.toObject({ getters: true }) });
};


const getPlacesByUserId = async (req, res, next) => {
    const uid = req.params.uid;

    let places;
    try {

        places = await Place.find({ creator: uid });

    } catch (err) {
        const error = new HttpError("fetching places has failed", 500);
        return next(error);
    }
    if (!places || places.length === 0) {
        const error = new HttpError("Could not find place with the provided user ID", 404);
        return next(error);
    }
    res.status(200).json({
        places: places.map(place => place.toObject({ getters: true }))
    });
}


const createPlace = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid input found', 422));
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
            'Creating place has failed',
            500
        );
        return next(error);
    }
    res.status(201).json({ place: createdPlace.toObject({ getters: true, virtuals: false }) });
}


const updatePlaceById = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs found', 404));
    }
    const pid = req.params.pid;
    const { title, description } = req.body;

    let place;

    try {
        place = await Place.findById(pid);
    } catch (err) {
        const error = new HttpError("something is off", 500);
        return next(error);
    }
    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError("Can t update the info, something went wrong", 500);
        return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
}

const deletePlaceById = async (req, res, next) => {
    const pid = req.params.pid;
    let place;

    try {
        place = await Place.findById(pid);
    } catch (err) {
        const error = new HttpError("something went off the grid", 500);
        return next(error);
    }

    try {
        await place.remove()
    } catch (err) {
        const error = new HttpError("Something went wrong during removal of the element", 500);
        return next(error);
    }


    res.status(200).json({ message: "item deleted" });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;

