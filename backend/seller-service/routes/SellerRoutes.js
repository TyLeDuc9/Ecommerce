const express = require('express');
const router = express.Router();
const Seller = require('../controllers/SellerControllers');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
const { upload } = require('../config/multer');

// Lấy tất cả sellers
router.get('/all', Seller.getAllSellers);

// Lấy seller theo ID
router.get('/:id', Seller.getSellerById);

// Tạo mới seller
router.post('/create', authenticate,
    authorizeRoles('admin', 'seller'), upload.array('image', 6), Seller.createSeller);

// Cập nhật seller theo ID
router.put('/update/:id', authenticate,
    authorizeRoles('admin', 'seller'), upload.array('image', 6), Seller.updateSeller);

// Xóa seller theo ID
router.delete('/delete/:id', authenticate,
    authorizeRoles('admin', 'seller'), Seller.deleteSeller);

module.exports = router;
