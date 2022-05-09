const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  wallet_id: String,
  date: Date,
  amount: Number,
  direction: String,
  balance: String,
  transaction_category: String, // enum
  platform: String, // enum
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

module.exports = TransactionModel;
