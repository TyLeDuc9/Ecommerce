<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/AuthUser');  

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/all', authController.getAllUsers);
router.get('/search', authController.searchUsersByName);
router.get('/sort', authController.sortUsersByName);
=======

const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/AuthUser');  // Dùng đúng tên middleware

router.post('/register', authController.register);
router.post('/login', authController.login);


>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
module.exports = router;
