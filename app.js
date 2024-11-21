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

/*app.get('/admin/products/new', function(req, res){
  res.render('admin/products/new');
});
app.post('/admin/products/new', function (request, response){
//request-objektet innehåller information gällande
//anropet som gjorts av klienten, däribland
//eventuell data som klienten har skickat
const post = {
  id: request.body.id, 
  namn: request.body.namn, 
  d_message: request.body.d_message, 
  photo: request.body.photo,
  sku: request.body.sku,
  amount: request.body.amount
};

//Lagra info i databasen

//förbereder SQL-kommandot som ska köras(kör inte nu)
const insert = db.prepare(`
  INSERT INTO posts(
  id,
  namn,
  d_message,
  photo,
  sku,
  amount
) VALUES (
  @id,
  @namn,
  @d_message,
  @photo,
  @sku,
  @amount
)
  `);
  
  insert.run(post);

  //Säg till klienten att gå till admin/products,
  //vilket alltså innebär att sidan laddas om i detta fallet
  response.redirect("/admin/products");
});
*/

module.exports = app;
