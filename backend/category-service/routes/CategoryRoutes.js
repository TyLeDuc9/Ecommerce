const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer'); 
const CategoryController = require('../controllers/CategoryController');

router.post('/category/create', upload.single('image'), CategoryController.createCategory);
router.get('/category/all', CategoryController.getAllCategories);
router.get('/category/search', CategoryController.searchCategoryName);
router.get('/category/sort', CategoryController.sortCategory);
router.get('/category/:id', CategoryController.getCategoryById);
router.put('/category/update/:id', upload.single('image'), CategoryController.updateCategory);
router.delete('/category/delete/:id', CategoryController.deleteCategory);

module.exports = router;










