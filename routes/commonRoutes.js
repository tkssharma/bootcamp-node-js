const express = require('express');

const router = express.Router();
const userController = require('../controller/UserController');


const expressJoiValidator = require('express-joi-validator');
const expressJoi = require('../lib/requestValidator');
const ValidateTokenMiddleware = require('../Middleware/authMiddleware');

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  userController.validateUser(req, res, (err, token) => {
    if (err) {
      res.status(401).json({ message: 'invalid user/password' });
    } else {
      // res.cookie('auth', token);
      // res.status(200).json({ success: true });
      res.status(200).json({ message: 'ok', token });
    }
  });
});

router.get('/register', (req, res, next) => {
  res.render('register');
});


router.get('/validate', ValidateTokenMiddleware.validateToken, (req, res, next) => {
  res.status(200).json(req.user);
});

router.post('/register', expressJoiValidator(expressJoi.createUser), (req, res, next) => {
  userController.createUser(req, res, (err, data) => {
    if (err) {
      res.status(401).json({ message: 'invalid user creation' });
    } else {
      res.status(200).json({ success: true, data });
    }
  });
});

module.exports = router;
