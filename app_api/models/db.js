const chalk = require('chalk');
const mongoose = require('mongoose');
const readline = require('readline');
const log = console.log;

let mainDbUri = 'mongodb://127.0.0.1:27017/loc8r';
let logDbUri = 'mongodb://127.0.0.1:27017/loc8r-log';

if (process.env.NODE_ENV === 'production'){
    log(chalk.red('Running in production environment'));
    const mongoUri = process.env.MONGODB_URI;
    mainDbUri = mongoUri + 'master-dev'; 
    logDbUri = mongoUri + 'log-dev';
}

const connectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useCreateIndex: true
};

const connect = (dbUri) => {
    setTimeout(() => mongoose.connect(dbUri, connectOptions), 1000);
};

mongoose.connection.on('connected', () => {
    log(chalk.green('Mongoose connection: success'));
  });
  
mongoose.connection.on('error', err => {
    log(chalk.red('Mongoose connection: failed with error: ' + err));
    return connect();
});
  
mongoose.connection.on('disconnected', () => {
    log(chalk.yellow('Mongoose connection: disconnected'));
});

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
    mongoose.connection.close( () => {
        log(chalk.red(`Mongoose disconnected through ${msg}`));
        callback();
    });
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

connect(mainDbUri);

require('./locations');