const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Account = new Schema({
  username: String,
  passwords: String
});

const AccountModal = mongoose.model('accounts', Account);

module.exports = AccountModal;
