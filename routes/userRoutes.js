const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController.js');
const { authenticate } = require('../middlewares/authMiddleware.js');
const router = express.Router();

// Get User Profile
router.get('/:id', authenticate, getUserProfile);

// Update User Profile
router.put('/:id', authenticate, updateUserProfile);

module.exports = router;
