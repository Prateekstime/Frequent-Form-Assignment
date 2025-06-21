const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');


// Save profile data
router.post('/user', userController.saveProfile);

// Get profile data
router.get('/user/:username', userController.getProfile);

module.exports = router;