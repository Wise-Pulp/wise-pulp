const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const UserOpinionSchema = require('./UserOpinion.model.js').schema

//Define the model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true},
  password: String,
  bills: [UserOpinionSchema]
});
//before saving a model, run this function
userSchema.pre('save', function(next) {
  //Get access to the User model
  const user = this;
  //generate a salt, then run callback
  bcrypt.genSalt(10, function(err1, salt) {
    if (err1) { return next(err1); }
  //hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err2, hash) {
      if (err2) { return next(err2); }

      //overwrite plain text password with encrypted password
      user.password = hash;

      //once everything is complete move on to the next process.
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};
//Create model class
const ModelClass = mongoose.model('user', userSchema);

//export the model
module.exports = ModelClass;