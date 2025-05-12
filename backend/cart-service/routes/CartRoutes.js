// const express = require('express');
// const router = express.Router();  // Khai báo router tại đây
// const CartController = require('../controllers/CartController');
// const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
// // Định nghĩa các route
// router.post('/create', CartController.createCart);
// router.get('/all', CartController.getAllCarts);
// router.get('/user/:userId', CartController.getCartByUser);
// router.get('/:id', CartController.getCartById);
// router.put('/update/:userId', CartController.updateCart);
// router.put('/updateCart/:id', CartController.updateCartById);
// router.delete('/cartUser/:userId', CartController.deleteCartUserId);
// router.delete('/deleteCart/:id', CartController.deleteCartItem);

// module.exports = router;
const express = require('express');
const router = express.Router();  // Khai báo router tại đây
const CartController = require('../controllers/CartController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
// Định nghĩa các route
router.post('/create', CartController.createCart);
router.get('/all', CartController.getAllCarts);
router.get('/user/:userId', CartController.getCartByUser);
router.get('/:id', CartController.getCartById);
router.put('/update/:userId', CartController.updateCart);
router.put('/updateCart/:id', CartController.updateCartById);
// router.delete('/delete/:userId', CartController.removeCart);
router.delete('/deleteCart/:id', CartController.deleteCartItem);

module.exports = router;