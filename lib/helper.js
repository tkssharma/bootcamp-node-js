
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports = {
  generateSaltValue(req, cb) {
    const { body } = req;
    return bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        cb(err, null);
      }
      return bcrypt.hash(body.password, salt, (error, hash) => {
        if (error) {
          cb(error, null);
        }
        cb(null, hash);
      });
    });
  }
};

