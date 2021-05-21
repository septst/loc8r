const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dom = require('jsdom-global')();
const favicon = require('favicons');
const cors = require('cors');

//mongo connection script
require('./app_api/models/db');

const apiRouter = require('./app_api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/@popperjs/core/dist/umd')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/')));
app.use('/static', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free')));

//cors
app.use(cors());

app.use('/api', apiRouter);
// app.get(/(\/about)  | (\/location\/[A-Za-z0-9]{24})| (\/s+)/, function (req, res, next) {
app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, 'app_public', 'dist', 'app-public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
