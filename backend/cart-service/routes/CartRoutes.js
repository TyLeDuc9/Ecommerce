<<<<<<< HEAD
const express = require('express');
const router = express.Router(); 
const CartController = require('../controllers/CartController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
router.post('/create', CartController.createCart);
router.get('/all', CartController.getAllCarts);
router.delete('/deleteCartByUser/:userId', CartController.deleteAllCartByUser);
=======
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
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
router.get('/user/:userId', CartController.getCartByUser);
router.get('/:id', CartController.getCartById);
router.put('/update/:userId', CartController.updateCart);
router.put('/updateCart/:id', CartController.updateCartById);
<<<<<<< HEAD
=======
// router.delete('/delete/:userId', CartController.removeCart);
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
router.delete('/deleteCart/:id', CartController.deleteCartItem);

module.exports = router;