const Category = require('../models/CategoryModel');

// Tạo mới một danh mục
exports.createCategory = async (req, res) => {
    try {
        const { name, describe, image} = req.body;
        const newCategory = new Category({ name, describe, image});
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
        const { name, describe, image } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, describe, image },
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

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.searchCategoryName = async (req, res) => {
    try {
        const { name } = req.query;
        const nameCode = name.toLowerCase(); 
        const category = await Category.find({
            name: { $regex: nameCode, $options: 'i' } 
        });

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.sortCategory = async (req, res) => {
    try {
        const category = await Category.find()
            .collation({ locale: 'vi', strength: 1 })
            .sort({ name: -1 }); 
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
