const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductControllers');
const { upload } = require('../config/multer');
router.get('/search', ProductController.searchProductName); 
router.get('/sort', ProductController.sortProduct); 
router.get('/all', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById); 
router.post('/create', upload.array('image', 6), ProductController.createProduct);
router.put('/update/:id', upload.array('image', 6), ProductController.updateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);

module.exports = router;
