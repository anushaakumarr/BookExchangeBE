const express = require('express');
const { register, login, resetPasswordRequest, resetPassword, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

module.exports = router;
