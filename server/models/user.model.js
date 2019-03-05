const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_name: String,
  user_password: String,
  user_phone: String,
  user_permission: {
    product: Boolean,
    bill: Boolean,
    user: Boolean,
    category: Boolean,
  },
  user_group: String,
  user_email: String,
  user_status: Boolean,
});
const Users = mongoose.model('Users', userSchema, 'Users');
module.exports = Users;
