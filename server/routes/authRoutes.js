const express = require('express');
const { register, login, updatePassword } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/update-password', authenticate, updatePassword);

module.exports = router;
