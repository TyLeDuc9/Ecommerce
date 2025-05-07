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
router.get('/popular', ProductController.getPopularProducts);
router.get("/check-views", async (req, res) => {
    try {
      const products = await Product.find({}, "name views");
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;
