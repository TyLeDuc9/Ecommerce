const express = require('express');
const router = express.Router();
const PaymentMethodController = require('../controllers/PaymentMethodController');

router.post('/create', PaymentMethodController.createPaymentMethod);
router.get('/all', PaymentMethodController.getAllPaymentMethods);
router.get('/:id', PaymentMethodController.getPaymentMethodById);
router.put('/update/:id', PaymentMethodController.updatePaymentMethod); 
router.delete('/delete/:id', PaymentMethodController.deletePaymentMethod);

module.exports = router;
