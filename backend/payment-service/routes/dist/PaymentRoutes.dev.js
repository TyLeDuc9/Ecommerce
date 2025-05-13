"use strict";

var express = require('express');

var router = express.Router();

var PaymentController = require('../controllers/PaymentController');

var _require = require('../../user-service/middlewares/AuthUser'),
    authenticate = _require.authenticate,
    authorizeRoles = _require.authorizeRoles;

router.post('/create', PaymentController.createPayment);
router.get('/all', authenticate, authorizeRoles('admin', 'seller'), PaymentController.getAllPayments);
router.get('/method/:paymentMethod', PaymentController.getPaymentByMethod);
router.get('/:id', PaymentController.getPaymentById);
router.put('/update/:id', authenticate, authorizeRoles('admin', 'seller'), PaymentController.updatePayment);
router["delete"]('/delete/:id', authenticate, authorizeRoles('admin', 'seller'), PaymentController.deletePayment);
module.exports = router;