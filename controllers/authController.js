const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Signup function
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    await User.create(firstName, lastName, email, hashedPassword);

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Error signing up', error: err.message });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const users = await User.findByEmail(email);  // Return rows directly, no need to destructure here
    
    // Check if user exists
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials, user not found' });
    }

    const user = users[0];  // Get the first user (since it returns an array of rows)

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials, incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token, message: `Welcome, ${user.firstName}` });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};


// Middleware to verify token
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    req.user = user;
    next();  // Proceed to the next middleware/route handler
  });
};

module.exports = { signup, login, authenticateJWT };

