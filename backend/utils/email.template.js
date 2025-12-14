const resePassTemp = (username, resetLink) => {
  return `
    <div style="font-family:Arial, sans-serif; line-height:1.5;">
      <h2>Hello ${username},</h2>
      <p>Click below to reset your password:</p>
      <p><a href="${resetLink}" style="color:#007bff;">Reset Password</a></p>
      <p>If you didn’t request this, ignore this email.</p>
    </div>
  `;
};

module.exports = resePassTemp;