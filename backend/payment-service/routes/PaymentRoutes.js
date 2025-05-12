const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
router.post('/create', PaymentController.createPayment);
router.get('/all', authenticate,
    authorizeRoles('admin', 'seller'), PaymentController.getAllPayments);
router.get('/method/:paymentMethod', PaymentController.getPaymentByMethod);
router.get('/:id', PaymentController.getPaymentById);
router.put('/update/:id', authenticate, authorizeRoles('admin', 'seller'), PaymentController.updatePayment);
router.delete('/delete/:id', authenticate,
    authorizeRoles('admin', 'seller'), PaymentController.deletePayment);

module.exports = router;
