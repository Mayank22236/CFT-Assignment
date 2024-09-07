const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const moment = require('moment');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const requestReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = moment().add(5, 'minutes').toISOString();

    await User.updateResetToken(email, resetToken, resetTokenExpiry);

    const resetLink = `http://localhost:3000/resetPassword.html?token=${resetToken}`;

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `Please click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`
    });

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    console.error('Error requesting password reset:', err);
    res.status(500).json({ message: 'Error requesting password reset', error: err.message });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findByResetToken(token);
    if (user.length === 0 || moment().isAfter(user[0].resetTokenExpiry)) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    res.sendFile(path.join(__dirname, '../public', 'resetPassword.html')); // Adjust the path accordingly
  } catch (err) {
    console.error('Error verifying reset token:', err);
    res.status(500).json({ message: 'Error verifying reset token', error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const user = await User.findByResetToken(token);
    if (user.length === 0 || moment().isAfter(user[0].resetTokenExpiry)) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updatePassword(user[0].email, hashedPassword);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};

module.exports = { requestReset, verifyToken, resetPassword };
