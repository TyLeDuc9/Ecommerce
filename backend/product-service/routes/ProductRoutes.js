const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductControllers');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');
const { upload } = require('../config/multer');
router.get('/search', ProductController.searchProductName);
router.get('/sort', ProductController.sortProduct);
router.get('/all', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/create', authenticate,
    authorizeRoles('admin', 'seller'), upload.array('image', 6), ProductController.createProduct);
router.put('/update/:id', authenticate,
    authorizeRoles('admin', 'seller'), upload.array('image', 6), ProductController.updateProduct);
router.delete('/delete/:id', authenticate,
    authorizeRoles('admin', 'seller'), ProductController.deleteProduct);

module.exports = router;
