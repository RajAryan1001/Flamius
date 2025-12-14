exports.verifyAdminEmail = (req, res, next) => {
  const { email } = req.body;

  if (email !== process.env.ADMIN_EMAIL_USER) {
    return res.status(403).json({ message: 'Unauthorized access! Only admin can proceed.' });
  }

  next();
};
