const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');

const DUMMY_DATA_USER = [
    {
        id: 'u1',
        email: 'fouad@fouadserradj.tech',
        password: 'allo',
        address: '5556 rue snowdon',
        numberPost: 2
    }
]

const getUsers = (req, res, next) => {

    const users = DUMMY_DATA_USER.filter(p => true);
    if (!users || users.length === 0) {
        return next(new HttpError('Could not find any current user', 404));
    }
    res.status(200).json({ users });
}

const signup = (req, res, next) => {
    const { email, password } = req.body;
    const createdUser = {
        id: uuidv4(),
        email,
        password
    }
    DUMMY_DATA_USER.push(createdUser);
    res.status(201).json({ user: createdUser });
}

const login = (req, res, next) => {
    const { email, password } = req.body;
    const loggedUser = DUMMY_DATA_USER.find(u => u.email === email);
    if (!loggedUser || loggedUser.password !== password) {
        return next(new HttpError('Could not login user. Email or password must be wrong', 401));
    }
    res.status(201).json({ message: 'User is login' });
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;