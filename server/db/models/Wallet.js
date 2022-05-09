const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  wallet_id: String,
  balance: Number,
});

const WalletModel = mongoose.model('Wallet', WalletSchema);

module.exports = WalletModel;
