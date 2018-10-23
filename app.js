
require('dotenv').config();
// loading .env file and putting all keys in process.env

console.log(` using ${process.env.NODE_ENV} to run application`);

global.configuration = require(`./config/environments/${process.env.NODE_ENV}`);

const express = require('express');
const path = require('path');
const mongoose = require('./lib/mongoose')();
const index = require('./routes/index');
const moviesRoutes = require('./routes/movies');
const ValidateTokenMiddleware = require('./Middleware/authMiddleware');
const authRoutes = require('./routes/passport/routes');
const commonRoutes = require('./routes/commonRoutes');


const app = express();
require('./express')(app);

app.use('/', index);
// auth/login
// auth/register
app.use('/auth', authRoutes);
// test/login
// test/register
app.use('/test', commonRoutes);


app.use('/movies', ValidateTokenMiddleware.validateToken, moviesRoutes);


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

