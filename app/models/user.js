var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    index: { 
      unique: true 
    } 
  },
  password: { 
    type: String, 
    required: true 
  }
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, isMatch);
    }
    
  });
};
UserSchema.pre('save', function(next) {
  var user = this;

    // hash the pw pleb
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

module.exports = mongoose.model('User', UserSchema);