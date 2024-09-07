// const pool = require('../config/database');

// // Find user by email
// exports.findByEmail = async (email) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     return rows;
//   } catch (err) {
//     throw new Error('Error querying database');
//   }
// };

// // Update reset token and expiry
// exports.updateResetToken = async (email, token, expiry) => {
//   try {
//     await pool.query('UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?', [token, expiry, email]);
//   } catch (err) {
//     throw new Error('Error updating reset token');
//   }
// };

// // Find user by reset token
// exports.findByResetToken = async (token) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM users WHERE resetToken = ?', [token]);
//     return rows;
//   } catch (err) {
//     throw new Error('Error querying database');
//   }
// };

// // Update password
// exports.updatePassword = async (email, password) => {
//   try {
//     await pool.query('UPDATE users SET password = ? WHERE email = ?', [password, email]);
//   } catch (err) {
//     throw new Error('Error updating password');
//   }
// };

const pool = require('../config/database');

// Find user by email
exports.findByEmail = async (email) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows;
  } catch (err) {
    throw new Error('Error querying database');
  }
};

// Create a new user
exports.create = async (firstName, lastName, email, password) => {
  try {
    await pool.query(
      'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, password]
    );
  } catch (err) {
    throw new Error('Error creating user');
  }
};

// Update reset token and expiry
exports.updateResetToken = async (email, token, expiry) => {
  try {
    await pool.query(
      'UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?',
      [token, expiry, email]
    );
  } catch (err) {
    throw new Error('Error updating reset token');
  }
};

// Find user by reset token
exports.findByResetToken = async (token) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE resetToken = ?', [token]);
    return rows;
  } catch (err) {
    throw new Error('Error querying database');
  }
};

// Update password
exports.updatePassword = async (email, password) => {
  try {
    await pool.query('UPDATE users SET password = ? WHERE email = ?', [password, email]);
  } catch (err) {
    throw new Error('Error updating password');
  }
};

