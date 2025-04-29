const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AutherUser=require('../middlewares/AutherUser')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/is-auth', AutherUser.AutherUser, AutherUser.IsAuth)
router.get('/logout', AutherUser.Logout, AutherUser.IsAuth)
module.exports = router;