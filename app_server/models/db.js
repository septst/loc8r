const mongoose = require('mongoose');
const readline = require('readline');

let mainDbUri = 'mongodb://127.0.0.1:27017/loc8r';
let logDbUri = 'mongodb://127.0.0.1:27017/loc8r-log';

if (process.env.NODE_ENV === 'production')
{
    console.log('Running in production environment');
    console.log(process.env.MONGODB_URI);
    const mongoUri = 'mongodb+srv://loc8ruser:Dostoevsky@loc8r.rfeuf.mongodb.net/';

    mainDbUri = mongoUri + 'master-dev'; 
    logDbUri = mongoUri + 'log-dev';
}


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
    connection.on('connected', () => {
        console.log(`Mongoose connected to ${connection.name}`);
    }); 

    connection.on('error', err => {
        console.log('Mongoose connection error in ${dbName}:', err);
    }); 

    connection.on('disconnected', () => {
        console.log(`Mongoose disconnected from ${connection.name}`);
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


require('./locations');

// mongoose.model('Location', locationSchema);