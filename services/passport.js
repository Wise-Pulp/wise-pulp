const passport = require('passport');
const User = require('../db/User.model');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Authenticate user using a username and password

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this username and password
  User.findOne({ email: email }, function(err, user){
    if (err) { 
      console.log('user not found!');
      return done(err); }
    if (!user) { return done(null, false); }

    //compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { 
        console.log('this is err in comparePassword', err)
        return done(err); 
      }
      console.log('this is match', isMatch)
      if(!isMatch) { return done(null, false) }

      return done(null, user);
    })
  // call done with user if it is correct username and password
  // otherwise call done with false
  })
})

//Setup options for JWT Strategy
jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if user ID in the payload exists in our database
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

  // If it does, call 'done' with that user
    if(user) {
      done(null, user);
    } else {
  // Otherwise, call done without a user object
      done(null, false);
    }
  });
});

// Tell passport to use this strategy

passport.use(jwtLogin);
passport.use(localLogin);