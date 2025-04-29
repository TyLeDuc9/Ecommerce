const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/create', CartController.createCart);
router.get('/all', CartController.getAllCarts);
router.get('/:id', CartController.getCartById);
router.put('/update/:id', CartController.updateCart); 
router.delete('/delete/:id', CartController.deleteCart);

module.exports = router;
