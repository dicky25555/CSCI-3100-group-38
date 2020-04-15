// NEED TO AUTHENTICATE - NEED TO MODIFY GET METHOD FOR ALL API
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// Initialize body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Connect to MongoDB
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@localhost/csci3100');
//mongoose.connect('mongodb://localhost:27017/data');
var db = mongoose.connection;

// Encrypter
global.crypto = require('crypto');

// Execute on connection failure
db.on('error', console.error.bind(console, 'Connection error:'));

// Execute once after openning
db.once('open', function ()
{
  console.log("Connection is open...");
});

// Router modules
var indexRouter = require('./routes/index');

// API modules
var category = require('./api/category.js');
var review = require('./api/review.js');
var service = require('./api/service.js');
var bookmark = require('./api/bookmark.js');
var customer = require('./api/customer.js');
var chat = require('./api/chat.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow router to access db
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', indexRouter);

// Handling database requests
app.use('/category', category);
app.use('/service', service);
app.use('/review', review);
app.use('/bookmark', bookmark);
app.use('/customer', customer);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
