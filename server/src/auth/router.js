import { Router } from 'express';
import passport from 'passport';

import { Strategy as FacebookStrategy } from 'passport-facebook';

import * as config from './../config';
import User from './../users/model';
import { generateToken } from './../auth/helpers';

const mutateUser = (user, profile, token) => {

  switch (profile.provider) {
    case 'facebook': {
      mutateUserFacebook(user, profile, token);
    }
  }

  return user;
};

const mutateUserFacebook = (user, profile, token) => {

  console.log(`mutating`, user, profile)

  if (!user.facebook.id)
    user.facebook.id = profile.id;

  if (typeof profile.emails !== 'undefined' && profile.emails.length > 0)
    user.facebook.email = profile.emails[0].value;

  user.facebook.token = token;
  user.facebook.name = profile.displayName;

  user.name = profile.displayName;

  return user;
};

const authCallback = (req, token, refreshToken, profile, done) => {

  const provider = profile.provider;
  const options = {};

  // Normalise profile ID into correct subobject
  if (provider === 'facebook') options['facebook.id'] = profile.id;

  console.log(`search for users that match`, options);

  User.findOne(options, (err, user) => {

    // Top-level error
    if (err) return done(err, false);

    // Create new user
    if (!user) {
      const newUser = new User();
      mutateUser(newUser, profile, token);

      return newUser.save(err => {
        if (err) return done(err);
        return done(null, newUser);
      });
    }

    console.log(`found`, user.name);

    // User is already authorised to use facebook
    if (user[provider].token) return done(null, user);

    // Update user to be authorised with facebook
    mutateUser(user, profile, token);

    user.save(err => {
      if (err) return done(err, false);
      return done(null, user);
    });

  });

};

// Strategies

passport.use(new FacebookStrategy({
  clientID: config.FACEBOOK_CLIENT_ID,
  clientSecret: config.FACEBOOK_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  passReqToCallback: true
}, authCallback));

// Routes

const auth = Router();

auth.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

auth.get('/facebook/callback', (req, res, next) => {

  passport.authenticate('facebook', (err, user, info) => {

    const token = generateToken(user, config.SECRET);
    res.cookie('token', token);
    res.redirect('/')

  })(req, res, next);

});

export default auth;
