const express = require('express');
const router = express.Router();
const PaymentStatusController = require('../controllers/PaymentStatusController');

router.post('/create', PaymentStatusController.createPaymentStatus);
router.get('/all', PaymentStatusController.getAllPaymentStatuss);
router.get('/:id', PaymentStatusController.getPaymentStatusById);
router.put('/update/:id', PaymentStatusController.updatePaymentStatus); 
router.delete('/delete/:id', PaymentStatusController.deletePaymentStatus);

module.exports = router;
