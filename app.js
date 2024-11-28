var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Add better-SQL3
const Database = require('better-sqlite3'); 
const db = new Database('./db/admin.db', { 
  verbose: console.log,
  fileMustExist: true
});



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//publicフォルダを静的ファイルとして提供,CSSファイルが正しく提供され、機能する
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);




// Kommer hantera alla inkommande förfrågningar (GET, POST, PUT, DELETE, etc.)
// till en resurs som har en URL som börjar med "/admin".
//app.use('/admin', adminRouter);







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
