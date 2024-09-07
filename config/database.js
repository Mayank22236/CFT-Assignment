const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // Database host (e.g., 'localhost')
  user: process.env.DB_USER,        // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME,    // Database name
  port: process.env.DB_PORT,        // Database port (e.g., 3306)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

module.exports = promisePool;
