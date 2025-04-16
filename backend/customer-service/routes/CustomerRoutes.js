const express = require('express');
const router = express.Router();
const CustomerController=require('../controllers/CustomerController');

router.post('/customer/create', CustomerController.createCustomer);
router.get('/customer/all', CustomerController.getAllCustomers);
router.get('/customer/search', CustomerController.searchCustomer);
router.get('/customer/sort', CustomerController.sortCustomer);
router.get('/customer/:id', CustomerController.getCustomerById);
router.put('/customer/update/:id', CustomerController.updateCustomer);
router.delete('/customer/delete/:id', CustomerController.deleteCustomer);
module.exports = router;