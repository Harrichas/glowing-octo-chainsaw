const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  jwtToken: String,
  accessToken: String,
  googleId: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
