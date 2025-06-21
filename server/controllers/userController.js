// controllers/userController.js
const Profile = require('../models/user.js');

// Save profile data (including photo URL)
exports.saveProfile = async (req, res) => {
  try {
    const {
      username,
      profilePhotoUrl,
      gender,
      currentPassword,
      newPassword,
      profession,
      address,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter
    } = req.body;

    // Check if profile already exists
    let profile = await Profile.findOne({ username });

    if (profile) {
      // Update existing profile
      if (profilePhotoUrl) profile.profilePhotoUrl = profilePhotoUrl;
      profile.gender = gender;
      profile.currentPassword = currentPassword;
      profile.newPassword = newPassword;
      profile.profession = profession;
      profile.address = address;
      profile.country = country;
      profile.state = state;
      profile.city = city;
      profile.subscriptionPlan = subscriptionPlan;
      profile.newsletter = newsletter;

      await profile.save();
      return res.status(200).json({ message: 'Profile updated successfully', profile });
    } else {
      // Create new profile
      profile = new Profile({
        username,
        profilePhotoUrl: profilePhotoUrl || '',
        gender,
        currentPassword,
        newPassword,
        profession,
        address,
        country,
        state,
        city,
        subscriptionPlan,
        newsletter
      });

      await profile.save();
      return res.status(201).json({ message: 'Profile created successfully', profile });
    }
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get profile data by username
exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOne({ username });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Return profile data including photo URL
    const profileData = {
      username: profile.username,
      profilePhotoUrl: profile.profilePhotoUrl,
      gender: profile.gender,
      profession: profile.profession,
      address: profile.address,
      country: profile.country,
      state: profile.state,
      city: profile.city,
      subscriptionPlan: profile.subscriptionPlan,
      newsletter: profile.newsletter,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    };

    res.status(200).json(profileData);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

