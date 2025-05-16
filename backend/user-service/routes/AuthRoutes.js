const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/AuthUser');  

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/all', authController.getAllUsers);
router.get('/search', authController.searchUsersByName);
router.get('/sort', authController.sortUsersByName);
module.exports = router;
