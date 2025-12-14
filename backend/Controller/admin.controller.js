const nodemailer = require('nodemailer');
const Admin = require('../Models/admin.model');

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.ADMIN_EMAIL_SERVICE,
  auth: {
    user: process.env.ADMIN_EMAIL_USER,
    pass: process.env.ADMIN_EMAIL_PASS
  }
});

// 📤 Send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (email !== process.env.ADMIN_EMAIL_USER) {
      return res.status(403).json({ message: 'Access denied: Not an admin email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    let admin = await Admin.findOne({ email });
    if (!admin) admin = new Admin({ email });

    admin.otp = otp;
    admin.otpExpires = otpExpires;
    await admin.save();

    // send OTP
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL_USER,
      to: email,
      subject: 'Admin Login OTP',
      text: `Your OTP for admin login is ${otp}. It expires in 5 minutes.`
    });

    res.json({ message: '✅ OTP sent successfully to your email!' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: '❌ Error sending OTP', error: error.message });
  }
};

// ✅ Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    if (admin.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (admin.otpExpires < new Date()) return res.status(400).json({ message: 'OTP expired' });

    // Clear OTP after successful verification
    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    res.json({ message: '🎉 Admin login successful!' });
  } catch (error) {
    res.status(500).json({ message: '❌ Error verifying OTP', error: error.message });
  }
};
