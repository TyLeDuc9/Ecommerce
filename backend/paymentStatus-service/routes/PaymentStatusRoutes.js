const express = require('express');
const router = express.Router();
const PaymentStatusController = require('../controllers/PaymentStatusController');

router.post('/paymentStatus/create', PaymentStatusController.createPaymentStatus);
router.get('/paymentStatus/all', PaymentStatusController.getAllPaymentStatuss);
router.get('/paymentStatus/:id', PaymentStatusController.getPaymentStatusById);
router.put('/paymentStatus/update/:id', PaymentStatusController.updatePaymentStatus); 
router.delete('/paymentStatus/delete/:id', PaymentStatusController.deletePaymentStatus);

module.exports = router;
