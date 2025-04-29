const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

router.post('/create', AddressController.createAddress);
router.get('/all', AddressController.getAllAddresss);
router.get('/search', AddressController.searchAddress);
router.get('/sort', AddressController.sortAddress);
router.get('/:id', AddressController.getAddressById);
router.put('/update/:id', AddressController.updateAddress); 
router.delete('/delete/:id', AddressController.deleteAddress);
module.exports = router;
