const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import the user controller

// Route to get all users
router.get('/', userController.getAllUsers);

module.exports = router;
