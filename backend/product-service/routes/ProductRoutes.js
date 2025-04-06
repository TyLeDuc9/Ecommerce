const express = require('express');
const router = express.Router();
const ProductController=require('../controllers/ProductControllers');

router.post('/product', ProductController.createProduct);
router.get('/product', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProductById);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);
module.exports = router;
