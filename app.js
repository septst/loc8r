const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dom = require('jsdom-global')();
const favicon = require('favicons');
const passport = require('passport');
const AppError = require('./app_api/utils/errors');
const config = require('./app_api/configs/config');
const morgan = require('morgan');
//handle async errors
require('express-async-errors');
//load env
require('dotenv').config();
//mongo connection script
require('./app_api/models/db');
//passport config
require('./app_api/configs/passport');
//create logger
const logger = require('./app_api/middlewares/logger');


const apiRouter = require('./app_api/routes/index');
const handleErrors = require('./app_api/middlewares/handleErrors');
const { AppNotFoundError } = require('./app_api/utils/errors');
const app = express();

app.use(morgan(":method :url :status :res[content-length] - :response-time ms",
  { "stream": logger.stream }));
// app.use(logger);

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/@popperjs/core/dist/umd')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/')));
app.use('/static', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free')));

//initialize passport config
app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000'];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


app.use('/api', apiRouter);

let allowedPaths = [
  "/home",
  "/login",
  "/register",
  "/about",
  "/settings",
  "/location/[a-z0-9]{24}"
]
let allowedRoutes = new RegExp("(" + allowedPaths.join(")|(\\") + ")", "i");
app.get(allowedRoutes, function (req, res, next) {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

//everything else goes to error
app.get("*", function (req, res, next) {
  return next(new AppNotFoundError("Invalid route"));
});

app.use(handleErrors);


// app.use((err, req, res, next) => {
//   if (err?.name === 'UnauthorizedError') {
//     res.status(401)
//       .json({ "message": err.name + ": " + err.message });
//   }
// });

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
