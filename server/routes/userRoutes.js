router.get('/check-username/:username', async (req, res) => {
  const exists = await User.exists({ username: req.params.username });
  res.json({ available: !exists });
});
