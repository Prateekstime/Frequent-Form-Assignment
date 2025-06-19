router.post('/update', upload.single('profilePhoto'), async (req, res) => {
  const { username, newPassword, currentPassword, ...rest } = req.body;
  
  let user = await User.findOne({ username });
  if (!user) user = new User({ username });
  
  if (newPassword) {
    // check current password & hash new password
  }

  if (req.file) {
    user.profilePhoto = req.file.filename;
  }

  Object.assign(user, rest);
  await user.save();
  res.json({ success: true });
});
