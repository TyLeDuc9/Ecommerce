const express = require('express');
const router = express.Router();
const TransportMethodController = require('../controllers/TransportMethodController');

router.post('/create', TransportMethodController.createTransportMethod);
router.get('/all', TransportMethodController.getAllTransportMethods);
router.get('/:id', TransportMethodController.getTransportMethodById);
router.put('/update/:id', TransportMethodController.updateTransportMethod); 
router.delete('/delete/:id', TransportMethodController.deleteTransportMethod);


module.exports = router;
