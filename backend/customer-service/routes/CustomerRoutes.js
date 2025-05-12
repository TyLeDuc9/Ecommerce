const express = require('express');
const router = express.Router();
const CustomerController=require('../controllers/CustomerController');
const { authenticate } = require('../../user-service/middlewares/AuthUser');

router.post('/create', CustomerController.createCustomer);
router.get('/all', authenticate, CustomerController.getAllCustomers); // Loại bỏ authorizeRoles để đơn giản hóa, bạn có thể điều chỉnh theo nhu cầu
router.get('/search', authenticate, CustomerController.searchCustomer); 
router.get('/sort', authenticate, CustomerController.sortCustomer); 
router.get('/user/:userId', authenticate, CustomerController.getCustomerByUserId);
router.get('/:id', authenticate, CustomerController.getCustomerById); 

router.put('/update/:id', CustomerController.updateCustomer);
router.delete('/delete/:id', authenticate, CustomerController.deleteCustomer); 

module.exports = router;