var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var accountRouter = require('./routes/account');
var billRounter = require('./routes/bill');
var billDetailsRounter = require('./routes/billDetail');
var categoryRounter = require('./routes/category');
var apiRouter = require('./routes/api');
var apiAccountRounter = require('./routes/apiAc');
var apiBillRounter = require('./routes/apiBill');
var apiBillDetailRounter = require('./routes/apiBillDetail');
var apiCategoryRounter = require('./routes/apiCategory');
var apiCartRounter = require('./routes/apiCart');
var apiThongKeRounter = require('./routes/apiThongKe')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/account',accountRouter);
app.use('/bill',billRounter);
app.use('/billDetail',billDetailsRounter);
app.use('/category',categoryRounter);
app.use('/api', apiRouter);
app.use('/apiAC',apiAccountRounter);
app.use('/apiBill',apiBillRounter);
app.use('/apiBillDetail',apiBillDetailRounter);
app.use('/apiCategory',apiCategoryRounter);
app.use('/apiCart',apiCartRounter);
app.use('/apiThongKe',apiThongKeRounter);

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
