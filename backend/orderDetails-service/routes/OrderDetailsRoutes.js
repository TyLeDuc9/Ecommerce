const express = require('express');
const router = express.Router();
const OrderDetailsController = require('../controllers/OderDetailsController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
router.post('/create',OrderDetailsController.createOrderDetails);
<<<<<<< HEAD
router.get('/order/:orderId', OrderDetailsController.getOrderDetailsByOrderId);
router.get('/all',OrderDetailsController.getAllOrderDetails);
=======
router.get('/all',authorizeRoles('admin', 'seller'), OrderDetailsController.getAllOrderDetails);
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
router.get('/:id',authorizeRoles('admin', 'seller'), OrderDetailsController.getOrderDetailsById);
router.put('/update/:id',authorizeRoles('admin', 'seller'), OrderDetailsController.updateOrderDetails); 
router.delete('/delete/:id',authorizeRoles('admin', 'seller'),OrderDetailsController.deleteOrderDetails);

module.exports = router;
