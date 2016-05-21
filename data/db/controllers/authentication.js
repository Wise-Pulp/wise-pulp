const User = require('../User.model');
const jwt = require('jwt-simple');
const config = require('../../../config');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

module.exports.signin = function(req, res) {
  //User has already supplied and verified their username and password
  //We need to give them a token.

    console.log('this is success', req.user)
    res.send({ token: tokenForUser(req.user), bills: req.user.bills });
}

module.exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;
  console.log(email) ;
  

  // if (!email || !password) {
  //  return res.status(422).send({"you must provide Email and Password"});
  // }

  //See if user with the given email exists
  User.findOne({ email: email }, function(err, existingUser){
    
    if(err) { 
      console.log('this is user error', err)
      return next(err); }

  console.log('this is existing user', existingUser)
  //if email is used, return an error
  if(existingUser) {
    return res.status(422).send({ error: 'Email is in use'});
  }
   // if a user with the email does NOT exist, create and save user record
    const user = new User ({
      email: email,
      password: password,
      bills: []
    });

    user.setPassword(function() {
      user.save(function(err) {
        if (err) { return next(err); }
        res.json({ token: tokenForUser(user) });
      });
    })

    console.log('this is user', user)

    

    //respond to request indicating user was saved.
   //res.json({ token: tokenForUser(user) });
  });
}