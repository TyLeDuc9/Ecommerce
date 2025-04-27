const Product = require('../models/ProductsModels');
const cloudinary = require('cloudinary').v2;
const Category = require('../../category-service/models/CategoryModel');
// Tạo mới một sản phẩm
exports.createProduct = async (req, res) => {
    try {
        const { name, price, describe, status, categoryId } = req.body;
        let imageUrls = []; 

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'products',
                });
                imageUrls.push(result.secure_url);
            }
        }

        const newProduct = new Product({
            name,
            price,
            describe,
            image: imageUrls,
            status,
            categoryId,
        });

        await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId'); 
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoryId'); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, describe, status, categoryId } = req.body;
        let updatedFields = { name, price, describe, status, categoryId };

        if (req.files && req.files.length > 0) {
            let imageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'products',
                });
                imageUrls.push(result.secure_url);
            }
            updatedFields.image = imageUrls;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true },
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);  
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchProductName = async (req, res) => {
    try {
        const { name } = req.query;
        const nameCode = name.toLowerCase();
        const product = await Product.find({
            name: { $regex: nameCode, $options: 'i' }
        });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.sortProduct = async (req, res) => {
    try {
        const product = await Product.find()
            .collation({ locale: 'vi', strength: 1 })
            .sort({ name: 1 });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
