const User = require('../User.model');
const jwt = require('jwt-simple');
const config = require('../../../config');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports.signin = function(req, res, next) {
  //User has already supplied and verified their username and password
  //We need to give them a token.
  console.log(tokenForUser(req.user))
  res.send({ token: tokenForUser(req.user) });
}
module.exports.signup = function(req, res, next) {
  console.log(req.body) ;

  var logit = {
    email: req.params.email,
    password: req.params.password,
    body: req.body
  }

  console.log('*********************', logit);
  const email = req.body.email;
  const password = req.body.password;
  

  // if (!email || !password) {
  //  return res.status(422).send({"you must provide Email and Password"});
  // }

  //See if user with the given email exists
  User.findOne({ email: email }, function(err, existingUser){
    
    if(err) { return next(err); }

  //if email is used, return an error
  if(existingUser) {
    return res.status(422).send({ error: 'Email is in use'});
  }
    //if a user with the email does NOT exist, create and save user record
    const user = new User ({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }
      return res.json({
          userId: user._id,
        });
    });

    //respond to request indicating user was saved.
   // res.json({ token: tokenForUser(user) });
  });
}