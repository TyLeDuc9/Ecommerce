"use strict";

var express = require('express');

var router = express.Router();

var CustomerController = require('../controllers/CustomerController');

var _require = require('../../user-service/middlewares/AuthUser'),
    authenticate = _require.authenticate;

router.post('/create', CustomerController.createCustomer);
router.get('/all', CustomerController.getAllCustomers);
router.get('/search', CustomerController.searchCustomer);
router.get('/sort', CustomerController.sortCustomer);
router.get('/user/:userId', CustomerController.getCustomerByUserId);
router.get('/:id', CustomerController.getCustomerById);
router.put('/update/:id', CustomerController.updateCustomer);
router["delete"]('/delete/:id', CustomerController.deleteCustomer);
module.exports = router;