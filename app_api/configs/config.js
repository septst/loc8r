'use strict';

const app ={
    port: process.env.APP_PORT,
    environment: process.env.APP_ENV
};

const google_api = {
    maps_key: process.env.GOOGLE_API_KEY
};

const mongodb ={
    uri: process.env.MONGODB_URI
};

const app_log = {
    file: '',
    level: 'info'
}

module.exports = {
    app,
    mongodb,
    app_log,
    google_api
};