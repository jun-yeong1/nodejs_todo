const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


const app = express();
dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const router = require("./routes/index"); // routes/index -> routes/todo
app.use(router);

//DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err){
    console.error("DB 오류", err);
  }
  console.log("DB 성공");
})


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
