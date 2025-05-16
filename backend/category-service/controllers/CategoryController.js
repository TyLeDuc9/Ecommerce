const Category = require('../models/CategoryModel');
const Product = require('../../product-service/models/ProductsModels');
const cloudinary = require('cloudinary').v2;

// Tạo mới một danh mục
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        let imageUrl = '';  
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'categories'
            });
            imageUrl = result.secure_url; 
        }

        const newCategory = new Category({ name, description, image: imageUrl });
        await newCategory.save();

        res.status(201).json({
            message: 'Category created successfully',
            category: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy danh mục theo ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật danh mục
exports.updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        let updatedFields = { name, description };

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'categories'
            });
            updatedFields.image = result.secure_url; 
        }
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({
            message: 'Category updated successfully',
            category,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa danh mục
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Cập nhật tất cả sản phẩm có categoryId này thành null
        await Product.updateMany(
            { categoryId: req.params.id },
            { $set: { categoryId: null } }
        );

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tìm kiếm theo tên danh mục
exports.searchCategoryName = async (req, res) => {
    try {
        const { name } = req.query;
        const category = await Category.find({
            name: { $regex: name, $options: 'i' }
        }).collation({ locale: 'vi', strength: 1 }); 
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Sắp xếp danh mục
exports.sortCategory = async (req, res) => {
    try {
        const order = req.query.order === 'desc' ? -1 : 1;
        const category = await Category.find()
            .collation({ locale: 'vi', strength: 1 })
            // .sort({ name: -1 });
              .sort({ name: order });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

