const mysql = require('mysql');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Create a password reset token
const create = (userId, token, expiry, callback) => {
  const query = 'INSERT INTO password_reset_tokens (user_id, token, expiry) VALUES (?, ?, ?)';
  pool.query(query, [userId, token, expiry], (err) => {
    if (err) return callback(err);
    callback(null);
  });
};

// Find token by value
const findByToken = (token, callback) => {
  const query = 'SELECT * FROM password_reset_tokens WHERE token = ?';
  pool.query(query, [token], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Delete a token
const deleteToken = (token, callback) => {
  const query = 'DELETE FROM password_reset_tokens WHERE token = ?';
  pool.query(query, [token], (err) => {
    if (err) return callback(err);
    callback(null);
  });
};

module.exports = { create, findByToken, delete: deleteToken };
