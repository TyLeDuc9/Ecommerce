const express = require('express');
const router = express.Router();
const OrderDetailsController = require('../controllers/OderDetailsController');

router.post('/create',OrderDetailsController.createOrderDetails);
router.get('/all', OrderDetailsController.getAllOrderDetails);
router.get('/:id', OrderDetailsController.getOrderDetailsById);
router.put('/update/:id', OrderDetailsController.updateOrderDetails); 
router.delete('/delete/:id', OrderDetailsController.deleteOrderDetails);

module.exports = router;
