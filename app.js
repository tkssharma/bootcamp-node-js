
require('dotenv').config();
// loading .env file and putting all keys in process.env

console.log(` using ${process.env.NODE_ENV} to run application`);

global.configuration = require(`./config/environments/${process.env.NODE_ENV}`);

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const logger = require('morgan');
const path = require('path');
const mongoose = require('./lib/mongoose')();
const index = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const movies = require('./routes/movies');
const ValidateTokenMiddleware = require('./Middleware/authMiddleware');
const passportRoutes = require('./routes/passport/routes');

const app = express();
require('./express')(app);

app.use('/', index);
// app.use('/auth', authRoutes);
app.use('/auth', passportRoutes);

// Noe this is a protected route
app.use('/movies', ValidateTokenMiddleware.validateToken, movies);
// app.use('/auth', authRoutes);


app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


function internalServerError(err, req, res, next) {
  if (err.isBoom) {
    // Error From  joi express validator
    const joiError = err.output.payload.error;
    const joiMessage = err.output.payload.message;
    res.status(err.output.statusCode).json({ message: joiMessage });
  } else {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err.stack
    });
  }
}
function PageNotFound(req, res, err) {
  res.status(404).json({
    success: false,
    message: 'api not found',
  });
}

app.use(PageNotFound);
app.use(internalServerError);

module.exports = app;

