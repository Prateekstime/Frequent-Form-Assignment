const User = require('./models/User');
const bcrypt = require('bcryptjs');

// ✅ Check Username Availability
exports.checkUsername = async (req, res) => {
  const exists = await User.exists({ username: req.params.username });
  res.json({ available: !exists });
};

// ✅ Save or Update Profile
exports.saveProfile = async (req, res) => {
  try {
    const {
      username,
      currentPassword,
      newPassword,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter,
    } = req.body;

    let user = await User.findOne({ username });

    // If new user, must have newPassword
    if (!user && !newPassword) {
      return res.status(400).json({ error: "New password required for new user" });
    }

    // Create or update user
    if (!user) {
      user = new User({ username });
    } else {
      // Check current password hash if changing password
      if (newPassword && currentPassword) {
        const match = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!match) {
          return res.status(400).json({ error: "Current password is incorrect" });
        }
      }
    }

    // If new password provided, hash it
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(newPassword, salt);
    }

    // Update other fields
    if (req.file) {
      user.profilePhoto = req.file.filename;
    }

    user.profession = profession;
    user.companyName = profession === 'Entrepreneur' ? companyName : '';
    user.addressLine1 = addressLine1;
    user.country = country;
    user.state = state;
    user.city = city;
    user.subscriptionPlan = subscriptionPlan;
    user.newsletter = newsletter === 'true';

    await user.save();

    res.json({ message: "Profile saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
