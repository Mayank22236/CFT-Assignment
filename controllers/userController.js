const db = require('../config/database');

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, firstName, lastName, email, createdAt, updatedAt FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
