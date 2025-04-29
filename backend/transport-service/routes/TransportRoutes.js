const express = require('express');
const router = express.Router();
const TransportController = require('../controllers/TransportController');

router.post('/create', TransportController.createTransport);
router.get('/all', TransportController.getAllTransports);
router.get('/:id', TransportController.getTransportById);
router.put('/update/:id', TransportController.updateTransport); 
router.delete('/delete/:id', TransportController.deleteTransport);

module.exports = router;
