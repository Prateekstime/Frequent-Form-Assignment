const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  profilePhoto: String,
  passwordHash: String,
  profession: String,
  companyName: String,
  addressLine1: String,
  country: String,
  state: String,
  city: String,
  subscriptionPlan: String,
  newsletter: Boolean,
});

module.exports = mongoose.model('User', userSchema);
