const express = require('express');
const multer = require('multer');
const path = require('path');

const { checkUsername, saveProfile } = require('../controllers/userController');

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPG/PNG allowed!'));
  },
});

// Routes
router.get('/check-username/:username', checkUsername);
router.post('/save-profile', upload.single('profilePhoto'), saveProfile);

module.exports = router;
