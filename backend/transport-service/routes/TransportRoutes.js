const express = require('express');
const router = express.Router();
const TransportController = require('../controllers/TransportController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
router.post('/create', authenticate,
    authorizeRoles('admin', 'seller'), TransportController.createTransport);
router.get('/all', TransportController.getAllTransports);
router.get('/method/:transportMethod', TransportController.getTransportByMethod);
router.get('/:id', TransportController.getTransportById);
router.put('/update/:id', authenticate,
    authorizeRoles('admin', 'seller'), TransportController.updateTransport);
router.delete('/delete/:id', authenticate,
    authorizeRoles('admin', 'seller'), TransportController.deleteTransport);

module.exports = router;
