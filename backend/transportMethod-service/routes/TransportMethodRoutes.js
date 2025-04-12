const express = require('express');
const router = express.Router();
const TransportMethodController = require('../controllers/TransportMethodController');

router.post('/transportMethod/create', TransportMethodController.createTransportMethod);
router.get('/transportMethod/all', TransportMethodController.getAllTransportMethods);
router.get('/transportMethod/:id', TransportMethodController.getTransportMethodById);
router.put('/transportMethod/update/:id', TransportMethodController.updateTransportMethod); 
router.delete('/transportMethod/delete/:id', TransportMethodController.deleteTransportMethod);


module.exports = router;
