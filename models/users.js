var mongoose               = require('mongoose'),
    passportLocalMongoose  = require('passport-local-mongoose');

/////////////////// USERSCHEMA

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
UserSchema.plugin(passportLocalMongoose);


var User = mongoose.model("User", UserSchema);

module.exports = User;