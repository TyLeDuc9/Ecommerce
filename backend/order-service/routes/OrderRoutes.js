const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/order/create', OrderController.createOrder);
router.get('/order/all', OrderController.getAllOrders);
router.get('/order/:id', OrderController.getOrderById);
router.put('/order/update/:id', OrderController.updateOrder); 
router.delete('/order/delete/:id', OrderController.deleteOrder);

module.exports = router;
