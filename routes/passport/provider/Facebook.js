

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const userController = require('../../../controller/UserController');

passport.use(new FacebookStrategy(
  {
    clientID: global.configuration.facebook.client_id,
    clientSecret: global.configuration.facebook.client_secret,
    callbackURL: global.configuration.facebook.callback_url,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    const data = profile._json;
    userController.registerSocial(
      {
        provider: 'facebook',
        name: data.name,
        email: data.email,
        mobno: '5436785432',
        meta: {
          provider: 'facebook',
          id: profile.id,
          token: accessToken,
        }
      },
      done
    );
  }
));

const FacebookRoutes = {
  authenticate: () => passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_location'] }),
  callback: () => passport.authenticate('facebook', {
    failureRedirect: '/auth/failed'
  })

};

module.exports = FacebookRoutes;
