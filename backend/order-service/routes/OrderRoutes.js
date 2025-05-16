const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
router.post('/create', OrderController.createOrder);
<<<<<<< HEAD
router.get('/user/:userId', OrderController.getOrdersByUserId);
router.get('/orderTransport/:id/', OrderController.getTransportByOrderId);
router.get('/all', authenticate, authorizeRoles('admin', 'seller'), OrderController.getAllOrders);
router.put('updateOrderTransport/:id', OrderController.updateOrderTransport);
router.get('/:id', authenticate, authorizeRoles('admin', 'seller'), OrderController.getOrderById);
router.put('/update/:id', authenticate, authorizeRoles('admin', 'seller'), OrderController.updateOrder);
router.delete('/delete/:id', OrderController.deleteOrder);
router.patch('/cancel/:orderId', OrderController.cancelOrder);
=======
router.get('/orderTransport/:id/', OrderController.getTransportByOrderId);
router.get('/all',  authenticate,
    authorizeRoles('admin', 'seller'),OrderController.getAllOrders);
router.put('updateOrderTransport/:id', OrderController.updateOrderTransport);
router.get('/:id',  authenticate,
    authorizeRoles('admin', 'seller'),OrderController.getOrderById);
router.put('/update/:id', authenticate,
    authorizeRoles('admin', 'seller'), OrderController.updateOrder); 
router.delete('/delete/:id', OrderController.deleteOrder);

>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
module.exports = router;
