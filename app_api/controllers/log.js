'use strict';

const mongoose = require('mongoose');
const logger = require('../middlewares/logger');
const { AppError, AppBadRequestError } = require('../utils/errors');

const logWrite = (req, res, next) => {
    const logModel = mongoose.model("Log");
    if (req.body.message && req.body.level) {
        var log = new logModel();
        log.date = new Date();
        log.level = req.body.level;
        log.message = req.body.message;
        log.addStackTrace(req.body);
        log.addUser(req.body);
        log.save((err) => {
            if (err) {
                return next(new AppError("Logging failed"));
            } else {
                return res.status(200).json({ "message": "logged" });
            }
        });
        //push the log to console.
        logToConsole(log);
    }
    else {
        return next(new AppBadRequestError("Logging service needs level and message details."))
    }
};

const logToConsole = (log) => {
    if (log.level === "info") {
        logger.info(log.message);
    } else if (log.level === "error") {
        logger.error(log.message);
        logger.info(log.stackTrace);
    }
}

module.exports = { logWrite };