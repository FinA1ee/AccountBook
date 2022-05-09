const mongoose = require('mongoose');

const AccountScheme = new mongoose.Schema({
  uid: String,
  username: String,
  avatar: String,
  wallet_id: String,
});

const AccountModel = mongoose.model('Account', AccountScheme);

module.exports = AccountModel;
