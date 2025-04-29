const express = require('express');
const router = express.Router();
const SellerController = require('../controllers/SellerController')
const AutherSeller=require('../middlewares/AutherSeller')


router.post('/login', SellerController.SellerLogin)
router.get('/is-auth', SellerController.IsSellerAuth, AutherSeller.autherSeller)
router.get('/logout', SellerController.SellerLogout)