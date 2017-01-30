var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = Schema({
  name: String,
  email: String,
  dob: Date,
  currentCity: String,
  profilePicture: String,
  passwordDigest: String,
  // TODO: If you are using hte userPlace as a join table, then there is no need to have this in your User model
  visitedPlaces: [{
    type: Schema.Types.ObjectId,
    ref: 'UserPlace'
  }],
  // TODO: Since a user's comments are thought to be unique and only owned by a single user, wouldn't it make more sense to embed them instead of referencing?
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// TODO: rearrange this method to take name, email, dob, and password as one object to make it more compact when calling.
UserSchema.statics.createSecure = function(name, email, dob, password, callback){
  var UserModel = this;

  bcrypt.genSalt(function(err,salt){
    bcrypt.hash(password, salt, function(err, hash){
      UserModel.create({
        name: name,
        email: email,
        dob: dob,
        passwordDigest: hash
      }, callback);
    });
  });
}

UserSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.passwordDigest);
}

// TODO: See similar to above @ line 22
UserSchema.statics.authenticate = function(email, password, callback){
    this.findOne({email:email}, function(err, user){
      if(!user){
        console.log("No user with email " + email);
        callback("Error, no user found", null);
      } else if(user.checkPassword(password)){
        callback(null, user);
      } else{
        callback("Error, incorrect password", null);
      }
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
