const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
/* eslint func-names:0 */

module.exports = function (app) {
  app.use(passport.initialize());
  // required for passport to initlize it
  app.use(passport.session());
  // initlize session
  app.use(logger('dev'));
  // logger logs on console
  app.use(bodyParser.json());
  // extract req body
  app.use(bodyParser.urlencoded({ extended: false }));
  // ?name = tarun&password=hello
  // req.query['name']
  // req.body['name']
  app.use(cookieParser()); // cookies-parser
  // manage session by cookies
  app.set('views', path.join(__dirname, 'views')); // setting views
  app.set('view engine', 'hbs');
  // server side template rendering
  app.use(express.static(path.join(__dirname, 'public')));
  // static folder path
  app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
  app.use(cookieParser());
};

