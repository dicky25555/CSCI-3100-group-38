// NEED TO AUTHENTICATE - NEED TO MODIFY GET METHOD FOR ALL API
var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');

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

// Models
require('./models/Customer.js');
require('./models/Service.js');
require('./models/Category.js');
require('./models/Chat.js');
require('./models/Bookmark.js');
require('./models/Review.js');

// Config
require('./config/passport.js');

// Session
app.use(session({
    secret: 'Key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 30
    }
}));

// Authenticator
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors());

// Router modules
var indexRouter = require('./routes/index');

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
