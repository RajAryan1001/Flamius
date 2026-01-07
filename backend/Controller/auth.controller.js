const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const userModel = require('../Models/user.model');
const sendMail = require('../services/mail.service');
const resePassTemp = require('../utils/email.template');

// Register
// const registerController = async (req, res) => {
//   try {
//     const { name, email, mobile, password } = req.body;
//     console.log('Register Request Body:', req.body); // Debug

//     // Check for passoword typo
//     if (password && !password) {
//       return res.status(400).json({ message: 'Field "passoword" is misspelled. Use "password" instead.' });
//     }

//     // Detailed field validation
//     const missingFields = [];
//     if (!name) missingFields.push('name');
//     if (!email) missingFields.push('email');
//     if (!password) missingFields.push('password');
//     if (!mobile) missingFields.push('mobile');
//     if (missingFields.length > 0) {
//       return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
//     }

//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) return res.status(409).json({ message: 'User already exists' });

//     const hashedPass = await bcrypt.hash(password, 10);
//     const newUser = await userModel.create({ name, email, mobile, password: hashedPass });

//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

//     res.status(201).json({ message: 'User registered', user: { id: newUser._id, name, email, mobile } });
//   } catch (error) {
//     console.error('Register Error:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// Register
const registerController = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    console.log('Register Request Body:', req.body); // Debug

    // ❌ REMOVE THIS USELESS CHECK COMPLETELY
    // if (password && !password) {
    //   return res.status(400).json({ message: 'Field "passoword" is misspelled. Use "password" instead.' });
    // }

    // Detailed field validation
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!mobile) missingFields.push('mobile');
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ 
      name, 
      email, 
      mobile, 
      password: hashedPass 
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { 
      expiresIn: '7d' // ✅ 1h se badhake 7d karo for better UX
    });
    
    // ✅ IMPROVED COOKIE SETTINGS FOR PRODUCTION
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({ 
      success: true, // ✅ Add success flag
      message: 'User registered successfully', 
      user: { 
        id: newUser._id, 
        name, 
        email, 
        mobile 
      },
      token: token // ✅ Frontend ke liye bhi token send karo
    });
    
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error', 
      error: error.message 
    });
  }
};

// Login
// const loginController = async (req, res) => {
//   try {
//     let { email, password, passoword } = req.body;
//     console.log('Login Request Body:', req.body);

//     // Fix typo if exists
//     if (!password && passoword) password = passoword;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password required' });
//     }

//     const user = await userModel.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const comparePass = await bcrypt.compare(password, user.password);
//     if (!comparePass) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

//     res.status(200).json({
//       message: 'User logged in',
//       user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile },
//     });
//   } catch (error) {
//     console.error('Login Error:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };


// Login
const loginController = async (req, res) => {
  try {
    let { email, password, passoword } = req.body;
    console.log('Login Request Body:', req.body);

    // Fix typo if exists
    if (!password && passoword) password = passoword;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password required' 
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '7d' 
    });
    
    // ✅ SAME COOKIE SETTINGS AS REGISTER
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        mobile: user.mobile 
      },
      token: token
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error', 
      error: error.message 
    });
  }
};

// Logout
const logoutController = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.status(200).json({ message: 'Logged out successfully' });
};

// Forgot password
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Forgot Password Request Body:', req.body); // Debug
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const baseUrl = process.env.APP_URL || 'http://localhost:4000';
    // const resetLink = `${baseUrl}/api/user/reset-password/${resetToken}`;
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    console.log(`Sending reset email to: ${email}, Link: ${resetLink}`);
    await sendMail(email, 'Reset Your Password', resePassTemp(user.name, resetLink));

    res.status(200).json({ message: `Reset link sent to ${email}` });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Reset password (renders EJS)
// const resetPasswordController = (req, res) => {
//   const { token } = req.params;
//   console.log('Reset Password Route Hit, Token:', token);
//   if (!token) return res.status(400).json({ message: 'Token required' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded ID:', decoded.id);
//     res.render('index.ejs', { id: decoded.id, token });
//   } catch (error) {
//     console.error('Reset Password Error:', error);
//     if (error.name === 'TokenExpiredError') return res.status(400).json({ message: 'Token expired' });
//     return res.status(400).json({ message: 'Invalid token' });
//   }
// };

const resetPasswordController = (req, res) => {
  const { token } = req.params;

  if (!token) return res.status(400).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Return JSON for React
    res.json({ id: decoded.id });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token expired' });
    }
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Update password
const updatePasswordController = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmPassword, token } = req.body;
    console.log('Update Password - ID:', id, 'Body:', req.body);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.id !== id) return res.status(400).json({ message: 'Invalid token' });
    } catch (error) {
      console.error('Token Verification Error:', error);
      if (error.name === 'TokenExpiredError') return res.status(400).json({ message: 'Token expired' });
      return res.status(400).json({ message: 'Invalid token' });
    }

    if (!password || !confirmPassword) return res.status(400).json({ message: 'Password and confirmPassword required' });
    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
    if (password.length < 6) return res.status(400).json({ message: 'Password too short' });

    const user = await userModel.findById(id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully', redirect: '/api/user/login' });
  } catch (error) {
    console.error('Update Password Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  updatePasswordController,
};