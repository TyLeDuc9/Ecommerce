const express = require('express');
const router = express.Router();
const Seller = require('../controllers/SellerControllers');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
const { upload } = require('../config/multer');
router.get('/all', Seller.getAllSellers);
router.get('/by-user/:userId', Seller.getSellerByUserId);
router.get('/:id', Seller.getSellerById);
router.post('/create', authenticate,authorizeRoles('admin', 'seller'), upload.array('image', 6), Seller.createSeller);
router.put('/update/:id', authenticate,authorizeRoles('admin', 'seller'), upload.array('image', 6), Seller.updateSeller);
router.delete('/delete/:id', authenticate,authorizeRoles('admin', 'seller'), Seller.deleteSeller);

module.exports = router;
