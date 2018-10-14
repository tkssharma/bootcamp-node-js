/* eslint prefer-destructuring:0 */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const userController = require('../../../controller/UserController');
const User = require('../../../models/User');
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy(
  {
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  },
  ((req, username, password, done) => {
    // write code here to find user if it exists in system
    User.find({ user: username }, (err, data) => {
      if (err) {
        return done({ code: 401, message: 'user not found', error: 'user not found' }, null);
      } else if (data.length === 0) {
        return done({ code: 401, message: 'user not found', error: 'user not found' }, null);
      }
      bcrypt.compare(password, data[0].password, (error, result) => {
        if (error) {
          return done({ code: 401, message: 'user pasword is incorrect', error: 'user pasword is incorrect' }, null);
        }
        return done(null, data);
      });
    });
  })
));


const localRoutes = {
  authenticate() {
    return passport.authenticate('local', { session: false });
  },
  authenticate_with_callback: () => passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failed'
  }),
};


module.exports = localRoutes;
