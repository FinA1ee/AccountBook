const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: String,
  username: String,
  password: String,
  email: String,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
