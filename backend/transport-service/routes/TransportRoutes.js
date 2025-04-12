const express = require('express');
const router = express.Router();
const TransportController = require('../controllers/TransportController');

router.post('/transport/create', TransportController.createTransport);
router.get('/transport/all', TransportController.getAllTransports);
router.get('/transport/:id', TransportController.getTransportById);
router.put('/transport/update/:id', TransportController.updateTransport); 
router.delete('/transport/delete/:id', TransportController.deleteTransport);

module.exports = router;
