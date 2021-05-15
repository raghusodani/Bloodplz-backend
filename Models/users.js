var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  address: String,
  phone: Number,
  bloodGroup: String,
  password: String,
  isDonor: Boolean
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');