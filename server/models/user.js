const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  profilePhoto: { type: String },  // filename stored
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  profession: { type: String, enum: ['Student', 'Developer', 'Entrepreneur'] },
  companyName: { type: String },

  addressLine1: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },

  subscriptionPlan: { type: String, enum: ['Basic', 'Pro', 'Enterprise'] },
  newsletter: { type: Boolean, default: true },
});

module.exports = mongoose.model('User', userSchema);
