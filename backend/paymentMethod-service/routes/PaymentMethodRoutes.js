const express = require('express');
const router = express.Router();
const PaymentMethodController = require('../controllers/PaymentMethodController');

router.post('/paymentMethod/create', PaymentMethodController.createPaymentMethod);
router.get('/paymentMethod/all', PaymentMethodController.getAllPaymentMethods);
router.get('/paymentMethod/:id', PaymentMethodController.getPaymentMethodById);
router.put('/paymentMethod/update/:id', PaymentMethodController.updatePaymentMethod); 
router.delete('/paymentMethod/delete/:id', PaymentMethodController.deletePaymentMethod);

module.exports = router;
