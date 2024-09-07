// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');  // This should import the correct file

// // Signup route
// router.post('/signup', authController.signup);

// // Login route
// router.post('/login', authController.login);

// router.get('/details', authController.authenticateJWT, authController.getUserDetails);

// // Protected route (only accessible with valid JWT token)
// router.get('/dashboard', authController.authenticateJWT, (req, res) => {
//   res.json({ message: 'Welcome to your dashboard!', user: req.user });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Ensure correct path

// Route for user signup
router.post('/signup', authController.signup);

// Route for user login
router.post('/login', authController.login);

// Example of a protected route
router.get('/protected', authController.authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});



module.exports = router;

