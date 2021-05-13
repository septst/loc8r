const mongoose = require('mongoose');
const readline = require('readline');

const mainDbUri = 'mongodb://localhost/loc8r';
const logDbUri = 'mongodb://localhost/loc8r-log';

const connectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser:true
};

const connMain = mongoose.createConnection(mainDbUri, connectOptions);
const connLog = mongoose.createConnection(logDbUri, connectOptions);
const connections = [
    connMain,
    connLog
];

for (let connection of connections)
{
    let dbName = connection.name;
    connection.on('connected', () => {
        console.log(`Mongoose connected to ${dbName}`);
    }); 

    connection.on('error', err => {
        console.log('Mongoose connection error in ${dbName}:', err);
    }); 

    connection.on('disconnected', () => {
        console.log(`Mongoose disconnected from ${dbName}`);
    });
};

//for windows
if(process.platform === 'win32'){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on ('SIGINT', () => {
        process.emit ("SIGINT");
    });

    rl.on ('SIGUSR2', () => {
        process.emit ("SIGUSR2");
    });
}

const gracefulShutdown = (msg, callback) => {
    for (let connection of connections)
    {
        connection.close( () => {
            console.log(`Mongoose disconnected through ${msg}`);
            callback();
        });
    };
};

// For nodemon starts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {                           
    gracefulShutdown('app termination', () => {          
      process.exit(0);                                   
    });
});

// For Heroku app termination  
process.on('SIGTERM', () => {                          
    gracefulShutdown('Heroku app shutdown', () => {      
      process.exit(0);                                   
    });
});
