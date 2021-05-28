'use strict';

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    stackTrace: String,
    userEmail: String,
});

logSchema.methods.addStackTrace = function (body) {
    if (body.stackTrace) {
        this.stackTrace = body.stackTrace;
    }
};

logSchema.methods.addUser = function (body) {
    if (body.userEmail) {
        this.userEmail = body.userEmail;
    }
}

mongoose.model("Log", logSchema);