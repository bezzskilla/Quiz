const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();



const conditionerRoute = require('./routes/conditioner-route');
const ventilationRoute = require('./routes/ventilation-route');
const mainRoute = require('./routes/main-route');

const app = express();

// Подключаем mongoose.
const connectionAddress = `mongodb+srv://Quiz:${process.env.DATABASE_EMAIL_PASSWORD}@cluster0.jsmw3.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
console.log(connectionAddress);
console.log('app22');
mongoose.connect(connectionAddress, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.pluralize(null);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SESSION
// app.use(session({
//   store: new FileStore(),
//   key: 'user_sid',
//   secret: 'kdjbvwlvhbwvjwbvrlwBVLKABVVALKVBAWLBVLIUv;LKNVWEAKJBVAJ NSLKVNWBF1234890',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secret: false },
// }));
// ----------------------------------------------------------------------ROUTES
app.use('/conditioner', conditionerRoute);
app.use('/ventilation', ventilationRoute);
app.use('/', mainRoute);
// ----------------------------------------------------------------------ROUTES

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT ?? 3000);
module.exports = app;
