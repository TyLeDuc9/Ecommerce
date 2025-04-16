const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

router.post('/address/create', AddressController.createAddress);
router.get('/address/all', AddressController.getAllAddresss);
router.get('/address/search', AddressController.searchAddress);
router.get('/address/sort', AddressController.sortAddress);
router.get('/address/:id', AddressController.getAddressById);
router.put('/address/update/:id', AddressController.updateAddress); 
router.delete('/address/delete/:id', AddressController.deleteAddress);
module.exports = router;
