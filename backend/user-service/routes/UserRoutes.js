const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AutherUser=require('../middlewares/AutherUser')

router.post('/user/register', UserController.register)
router.post('/user/login', UserController.login)
router.get('/user/is-auth', AutherUser.AutherUser, AutherUser.IsAuth)
router.get('/user/logout', AutherUser.Logout, AutherUser.IsAuth)
module.exports = router;