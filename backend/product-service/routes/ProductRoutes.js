const express = require('express');
const router = express.Router();
const ProductController=require('../controllers/ProductControllers');

router.post('/product/create', ProductController.createProduct);
router.get('/product/all', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProductById);
router.put('/product/update/:id', ProductController.updateProduct);
router.delete('/product/delete/:id', ProductController.deleteProduct);
module.exports = router;
