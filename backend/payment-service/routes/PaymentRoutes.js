const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/create', PaymentController.createPayment);
router.get('/all', PaymentController.getAllPayments);
router.get('/:id', PaymentController.getPaymentById);
router.put('/update/:id', PaymentController.updatePayment); 
router.delete('/delete/:id', PaymentController.deletePayment);

module.exports = router;
