const express = require('express');
const router = express.Router();
const {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  updatePasswordController,
} = require('../Controller/auth.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

// Protected home route
router.get('/home', authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Home Page 🎉"});
});

// Login page route
router.get('/login', (req, res) => {
  res.render('login.ejs');
});

// Authentication routes
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/forgot-password', forgotPasswordController);
router.get('/reset-password/:token', resetPasswordController);
router.post('/update-password/:id', updatePasswordController);


module.exports = router;