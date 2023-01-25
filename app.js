var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var insertionRouter = require('./routes/insertion');
var loginRouter = require('./routes/login');
var middlware=require('./middleware/middleware');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//middleware.sync();
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insertion',middlware.checktoken,insertionRouter);
app.use('/login', loginRouter);

module.exports = app;
