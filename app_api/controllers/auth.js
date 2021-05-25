const passport = require('passport');
const mongoose = require('mongoose');
const { AppBadRequestError, AppError, AppUnauthorizedError } = require('../utils/errors');
const userModel = mongoose.model('User');

const register = (req, res, next) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        return next(new AppBadRequestError("All fields are required"));
    }
    const newUser = new userModel();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.setPassword(req.body.password);
    newUser.save((err) => {
        if (err?.code === 11000) {
            return next(new AppBadRequestError("The user already exists."));
        } else if (err) {
            return next(new AppError(err.message));
        } else {
            const token = newUser.generateJwt();
            return res.status(200)
                .json({ token });
        }
    })

};
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return next(new AppBadRequestError("The user already exists."));
    }

    passport.authenticate("local",
        (err, authUser, info) => {
            if (err) {
                return next(new AppError(err.message));
            }

            if (authUser) {
                let token = authUser.generateJwt();
                res.status(200).json({ token });
            } else {
                return next(new AppUnauthorizedError(info));
            }
        })(req, res);
};

module.exports = {
    register,
    login
};