const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/payment/create', PaymentController.createPayment);
router.get('/payment/all', PaymentController.getAllPayments);
router.get('/payment/:id', PaymentController.getPaymentById);
router.put('/payment/update/:id', PaymentController.updatePayment); 
router.delete('/payment/delete/:id', PaymentController.deletePayment);

module.exports = router;
