const express = require('express');
const router = express.Router();
const OrderDetailsController = require('../controllers/OderDetailsController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
router.post('/create',OrderDetailsController.createOrderDetails);
router.get('/order/:orderId', OrderDetailsController.getOrderDetailsByOrderId);
router.get('/all',OrderDetailsController.getAllOrderDetails);
router.get('/:id',authorizeRoles('admin', 'seller'), OrderDetailsController.getOrderDetailsById);
router.put('/update/:id',authorizeRoles('admin', 'seller'), OrderDetailsController.updateOrderDetails); 
router.delete('/delete/:id',authorizeRoles('admin', 'seller'),OrderDetailsController.deleteOrderDetails);

module.exports = router;
