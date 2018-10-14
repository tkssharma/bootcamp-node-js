const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helper = require('../lib/helper');

const saltRounds = 10;
class userController {
  static validateUser(req, res, cb) {
    const { body } = req;
    User.find({ user: body.user }, (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        bcrypt.compare(body.password, data[0].password, (error, result) => {
          if (result) {
            jwt.sign({ user: data[0] }, 'secretkey', (tokError, token) => {
              cb(null, token);
            });
          } else {
            cb(new Error('username password does not match'), data);
          }
        });
      }
    });
  }
  static registerDefault(req, res, cb) {
    const { body } = req;
    helper.generateSaltValue(req, (err, hash) => {
      if (err) {
        cb(err, null);
      }
      return User.create({
        user: body.user, password: hash, mobno: body.mobno, email: body.email
      }, (error, data) => {
        if (error) {
          cb(error, null);
        } else {
          cb(null, data);
        }
      });
    });
  }
  static registerSocial(user, callback) {
    User.findOne({ email: user.email }, (error, existingUser) => {
      if (existingUser) {
        callback(null, (existingUser));
      } else {
        User.create({
          user: user.email, mobno: user.mobno, email: user.email
        }, (err, data) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, data);
          }
        });
      }
    });
  }
  // old method
  static createUser(req, res, cb) {
    const { body } = req;
    helper.generateSaltValue(req, (err, hash) => {
      if (err) {
        cb(err, null);
      }
      return User.create({
        user: body.user, password: hash, mobno: body.telnum, email: body.email
      }, (error, data) => {
        if (error) {
          cb(error, null);
        } else {
          cb(null, data);
        }
      });
    });
  }
}

module.exports = userController;
