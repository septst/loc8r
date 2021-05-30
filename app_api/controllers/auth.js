const passport = require('passport');
const mongoose = require('mongoose');
const { AppBadRequestError, AppError, AppUnauthorizedError } = require('../utils/errors');
const userModel = mongoose.model('User');
const auditModel = mongoose.model('Audit');

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
            addAuditLog(newUser.email, true)
            const token = newUser.generateJwt();
            return res.status(200)
                .json({ token });
        }
    })

};
const login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new AppBadRequestError("All fields are required."));
    }

    passport.authenticate("local",
        (err, authUser, info) => {
            if (err) {
                addAuditLog(req.body.email, false, err.message)
                return next(new AppError(err.message));
            }

            if (authUser) {
                addAuditLog(req.body.email, true)
                let token = authUser.generateJwt();
                res.status(200).json({ token });
            } else {
                addAuditLog(req.body.email, false, info.message)
                return next(new AppUnauthorizedError(info.message));
            }
        })(req, res);
};

const addAuditLog = (email, success, errors) =>{
    var auditLog = new auditModel();
    auditLog.date = new Date();
    auditLog.userEmail = email;
    auditLog.loginSuccess = success;
    auditLog.addLoginErrors(errors);
    auditLog.attempts = 1;
    auditLog.save((err) => {
        if(err){
            console.log(err);
        }else{
            return;
        }
    });
}

module.exports = {
    register,
    login
};