const express = require('express');
const router = express.Router();
const OrderDetailsController = require('../controllers/OderDetailsController');

router.post('/orderDetails/create',OrderDetailsController.createOrderDetails);
router.get('/orderDetails/all', OrderDetailsController.getAllOrderDetails);
router.get('/orderDetails/:id', OrderDetailsController.getOrderDetailsById);
router.put('/orderDetails/update/:id', OrderDetailsController.updateOrderDetails); 
router.delete('/orderDetails/delete/:id', OrderDetailsController.deleteOrderDetails);

module.exports = router;
