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
    status: {
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

mongoose.model("Log", logSchema);