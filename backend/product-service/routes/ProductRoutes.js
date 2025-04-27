const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductControllers');
const { upload } = require('../config/multer');
router.get('/product/search', ProductController.searchProductName); 
router.get('/product/sort', ProductController.sortProduct); 
router.get('/product/all', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProductById); 
router.post('/product/create', upload.array('image', 6), ProductController.createProduct);
router.put('/product/update/:id', upload.array('image', 6), ProductController.updateProduct);
router.delete('/product/delete/:id', ProductController.deleteProduct);

module.exports = router;
