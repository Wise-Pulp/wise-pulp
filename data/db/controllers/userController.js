var User = require('../User.model.js');

module.exports.createContributor = function (user, callback) {
  var newUser = new User({
    username: user.username,
    password: user.password
  });

  newUser.save(function(err) {
    if(err) {
          console.log('User Saved Failed!');
          throw err;
        }

  console.log("User successfully created!");
    callback(err, newUser);
  });
};
