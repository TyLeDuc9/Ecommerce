
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/AuthUser');  // Dùng đúng tên middleware

router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;
