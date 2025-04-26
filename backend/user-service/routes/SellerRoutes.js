const express = require('express');
const router = express.Router();
const SellerController = require('../controllers/SellerController')
const AutherSeller=require('../middlewares/AutherSeller')


router.post('/seller/login', SellerController.SellerLogin)
router.get('/seller/is-auth', SellerController.IsSellerAuth, AutherSeller.autherSeller)
router.get('/seller/logout', SellerController.SellerLogout)