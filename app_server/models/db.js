const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost/loc8r';
mongoose.connect(dbUri, {useUnifiedTopology: true, useNewUrlParser:true});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbUri}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected from ${dbUri}`);
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
}

// For nodemon starts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});