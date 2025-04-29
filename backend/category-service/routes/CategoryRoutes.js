const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer'); 
const CategoryController = require('../controllers/CategoryController');

router.post('/create', upload.single('image'), CategoryController.createCategory);
router.get('/all', CategoryController.getAllCategories);
router.get('/search', CategoryController.searchCategoryName);
router.get('/sort', CategoryController.sortCategory);
router.get('/:id', CategoryController.getCategoryById);
router.put('/update/:id', upload.single('image'), CategoryController.updateCategory);
router.delete('/delete/:id', CategoryController.deleteCategory);

module.exports = router;










