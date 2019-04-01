const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: String,
  expired: Date,
  user: String
});

const TokensResetPassword = mongoose.model(
  'TokensResetPassword',
  tokenSchema,
  'TokensResetPassword'
);
module.exports = TokensResetPassword;
