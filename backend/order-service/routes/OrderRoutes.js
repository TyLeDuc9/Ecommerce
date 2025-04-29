const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/create', OrderController.createOrder);
router.get('/all', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.put('/update/:id', OrderController.updateOrder); 
router.delete('/delete/:id', OrderController.deleteOrder);

module.exports = router;
