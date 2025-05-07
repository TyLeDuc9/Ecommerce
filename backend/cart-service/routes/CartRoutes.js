const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
router.post('/create', authenticate,
    authorizeRoles('admin', 'seller', 'customer'), CartController.createCart);
router.get('/all', CartController.getAllCarts);
router.get('/:id', CartController.getCartById);
router.put('/update/:id', authenticate,
    authorizeRoles('admin', 'seller'), CartController.updateCart);
router.delete('/delete/:id', authenticate,
    authorizeRoles('admin', 'seller'), CartController.deleteCart);

module.exports = router;
