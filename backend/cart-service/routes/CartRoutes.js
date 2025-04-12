const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/cart/create', CartController.createCart);
router.get('/cart/all', CartController.getAllCarts);
router.get('/cart/:id', CartController.getCartById);
router.put('/cart/update/:id', CartController.updateCart); 
router.delete('/cart/delete/:id', CartController.deleteCart);

module.exports = router;
