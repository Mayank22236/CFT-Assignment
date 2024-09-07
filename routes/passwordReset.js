const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

router.post('/request', passwordResetController.requestReset);

router.get('/reset/:token', passwordResetController.verifyToken);

router.post('/reset/:token', passwordResetController.resetPassword);

module.exports = router;
