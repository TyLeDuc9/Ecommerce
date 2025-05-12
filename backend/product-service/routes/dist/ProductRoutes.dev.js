"use strict";

var express = require('express');

var router = express.Router();

var ProductController = require('../controllers/ProductControllers');

var _require = require('../../user-service/middlewares/AuthUser'),
    authenticate = _require.authenticate,
    authorizeRoles = _require.authorizeRoles;

var _require2 = require('../config/multer'),
    upload = _require2.upload;

router.get('/search', ProductController.searchProductName);
router.get('/sort', ProductController.sortProduct);
router.get('/all', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.get('/sellers/:sellerId', ProductController.getProductsBySeller);
router.get('/seller/:productId', ProductController.getProductDetails);
router.post('/create', authenticate, authorizeRoles('admin', 'seller'), upload.array('image', 6), ProductController.createProduct);
router.put('/update/:id', authenticate, authorizeRoles('admin', 'seller'), upload.array('image', 6), ProductController.updateProduct);
router["delete"]('/delete/:id', authenticate, authorizeRoles('admin', 'seller'), ProductController.deleteProduct);
router.get('/popular', ProductController.getPopularProducts);
module.exports = router;