const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer');
const CategoryController = require('../controllers/CategoryController');
const { authenticate, authorizeRoles } = require('../../user-service/middlewares/AuthUser');

router.post(
    '/create',
    authenticate,
    authorizeRoles('admin', 'seller'),
    upload.single('image'),
    CategoryController.createCategory
);

router.put(
    '/update/:id',
    authenticate,
    authorizeRoles('admin', 'seller'),
    upload.single('image'),
    CategoryController.updateCategory
);

router.delete(
    '/delete/:id',
    authenticate,
    authorizeRoles('admin', 'seller'),
    CategoryController.deleteCategory
);

router.get('/all', CategoryController.getAllCategories);
router.get('/search', CategoryController.searchCategoryName);
router.get('/sort', CategoryController.sortCategory);
router.get('/:id', CategoryController.getCategoryById);

module.exports = router;





