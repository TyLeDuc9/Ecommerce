const express = require('express');
const router = express.Router();
const Seller = require('../controllers/SellerControllers');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
const { upload } = require('../config/multer');
<<<<<<< HEAD
router.get('/all', Seller.getAllSellers);
router.get('/by-user/:userId', Seller.getSellerByUserId);
router.get('/:id', Seller.getSellerById);
router.post('/create', authenticate,authorizeRoles('admin', 'seller'), upload.array('image', 6), Seller.createSeller);
router.put('/update/:id', authenticate,authorizeRoles('admin', 'seller'), upload.array('image', 6), Seller.updateSeller);
router.delete('/delete/:id', authenticate,authorizeRoles('admin', 'seller'), Seller.deleteSeller);
=======

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
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6

module.exports = router;
