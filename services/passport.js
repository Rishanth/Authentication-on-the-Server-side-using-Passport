import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../config';
import User from '../models/user';
const LocalStrategy = require('passport-local');

//Setup Options for jwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.SECRET
};

//Create LocalStrategy
const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions,(email, password, done) => {

  User.findOne({email},(error, user) => {
     if (error) {
        return done(error);
     }
     if (!user) {
        return done(null, false);
     }
     return done(null, user);
  });
});



//Create Jwt Strategy
const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub,(err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
       done(null, user);
    }
    else {
      done(null, false);
    }
  });

});

passport.use(jwtLogin);
passport.use(localLogin);
