var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoSessionURL = "mongodb://smartadmin:tiger123@ds257077.mlab.com:57077/smart-task-db";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var index = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
var corsOptions = {
    origin: process.env.REACT_ORIGIN_URL || 'http://localhost:3001',
    credentials: true,
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    cookieName: 'session',
    secret: "CMPE280_optimize",
    resave: false,
    saveUninitialized: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));


app.use('/', index);
app.use('/users', users);
/*app.get('/tasks/addtask', function (req, res) {
    console.log(req.session.user);
    res.end();
});*/
app.use('/tasks', tasks);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
