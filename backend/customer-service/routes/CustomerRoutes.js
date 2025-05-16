const express = require('express');
const router = express.Router();
const CustomerController=require('../controllers/CustomerController');
const { authenticate } = require('../../user-service/middlewares/AuthUser');

router.post('/create', CustomerController.createCustomer);
router.get('/all',  CustomerController.getAllCustomers);
router.get('/search',  CustomerController.searchCustomer); 
router.get('/sort',  CustomerController.sortCustomer); 
router.get('/user/:userId',  CustomerController.getCustomerByUserId);
router.get('/:id',  CustomerController.getCustomerById); 

router.put('/update/:id', CustomerController.updateCustomer);
router.delete('/delete/:id',  CustomerController.deleteCustomer); 

module.exports = router;