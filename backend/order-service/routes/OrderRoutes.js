const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
router.post('/create', OrderController.createOrder);
router.get('/orderTransport/:id/', OrderController.getTransportByOrderId);
router.get('/all',  authenticate,
    authorizeRoles('admin', 'seller'),OrderController.getAllOrders);
router.put('updateOrderTransport/:id', OrderController.updateOrderTransport);
router.get('/:id',  authenticate,
    authorizeRoles('admin', 'seller'),OrderController.getOrderById);
router.put('/update/:id', authenticate,
    authorizeRoles('admin', 'seller'), OrderController.updateOrder); 
router.delete('/delete/:id', OrderController.deleteOrder);

module.exports = router;
