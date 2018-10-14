const express = require('express');

const router = express.Router();
const passport = require('passport');
const LocaleRoute = require('./provider/Locale');
const UserController = require('../../controller/UserController');
const jwt = require('jsonwebtoken');
// seralize user Object
const expressJoiValidator = require('express-joi-validator');
const expressJoi = require('../../lib/requestValidator');
const FacebookRoutes = require('./provider/Facebook');

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

router.post('/login', LocaleRoute.authenticate(), (req, res) => {
  // login stuff here
  if (req.user && req.user[0].user) {
    jwt.sign({ user: req.user }, 'secretkey', (tokError, token) => {
      res.json({
        code: 200,
        message: 'success',
        token
      });
    });
    // generate token
  } else {
    res.json({
      code: 401,
      message: 'error',
      error: req.user.error
    });
  }
});

router.post('/register', expressJoiValidator(expressJoi.createUser), (req, res) => {
  UserController.registerDefault(req, res, (error, user) => {
    if (error) {
      res.json({ code: 400, message: 'error', error });
    } else {
      res.json({
        code: 200,
        message: 'success',
        user
      });
    }
  });
});

const redirectSocialUser = (req, res) => {
  res.json(req.user);
};

// auth/login/facebook ---> 
router.get('/login/facebook', FacebookRoutes.authenticate());
router.get('/callback/facebook', FacebookRoutes.callback(), redirectSocialUser);


module.exports = router;
