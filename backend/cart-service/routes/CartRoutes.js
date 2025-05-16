const express = require('express');
const router = express.Router(); 
const CartController = require('../controllers/CartController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
router.post('/create', CartController.createCart);
router.get('/all', CartController.getAllCarts);
router.delete('/deleteCartByUser/:userId', CartController.deleteAllCartByUser);
router.get('/user/:userId', CartController.getCartByUser);
router.get('/:id', CartController.getCartById);
router.put('/update/:userId', CartController.updateCart);
router.put('/updateCart/:id', CartController.updateCartById);
router.delete('/deleteCart/:id', CartController.deleteCartItem);

module.exports = router;