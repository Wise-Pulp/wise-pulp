var User = require('../User.model.js');

module.exports.createUser = function (user, callback) {

    User.find({ username: user.username }, function(err, found) {
      if(found) {
        return 'User already has that username'; 
      } //else {

  var newUser = new User({
    username: user.username,
    password: user.password
  });

  newUser.save(function(err, callback) {
    if(err) {
      console.log('User Saved Failed!');
      throw err;
      }

  
    callback(err, newUser);
      });
    // }
  })
};
