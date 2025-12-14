const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../Controller/admin.controller');
const { verifyAdminEmail } = require('../Middlewares/admin.middleware');

// Routes
router.post('/send-otp', verifyAdminEmail, sendOTP);
router.post('/verify-otp', verifyAdminEmail, verifyOTP);

module.exports = router;
