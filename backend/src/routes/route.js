const express = require('express');
const router = express.Router();
const {
    register,
    login,
    forgotPassword,
} = require('../controllers/authController');
const {
    createCapsule,
    getUserCapsules,
} = require('../controllers/capsuleController');

// Authentication Routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/forgotPassword', forgotPassword);

// Capsule Routes
router.post('/capsules', createCapsule);
router.get('/capsules/user/:userId', getUserCapsules);

module.exports = router;
