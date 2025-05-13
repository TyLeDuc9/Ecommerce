const Product = require("../models/ProductsModels");
const cloudinary = require("cloudinary").v2;
const Category = require("../../category-service/models/CategoryModel");
// Tạo mới một sản phẩm
exports.createProduct = async (req, res) => {
  try {
    const { name, price, describe, status, categoryId, quantity, views } =
      req.body;
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
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
      quantity,
      views: 0, // Khởi tạo số lượt xem là 0
    });

    await Product.updateMany(
      { views: { $exists: false } }, // Tìm tất cả document chưa có trường views
      { $set: { views: 0 } } // Thêm trường views với giá trị mặc định là 0
    );

    await newProduct.save();

    res.status(201).json({
      message: "Tạo sản phẩm thành công",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
  try {
    // Tìm sản phẩm và tăng số lượt xem lên 1 trong cùng một thao tác
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // Tăng views lên 1
      { new: true } // Trả về document đã được cập nhật
    ).populate("categoryId");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, describe, status, categoryId, quantity, views } =
      req.body;
    let updatedFields = {
      name,
      price,
      describe,
      status,
      categoryId,
      quantity,
      views,
    };

    if (req.files && req.files.length > 0) {
      let imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        imageUrls.push(result.secure_url);
      }
      updatedFields.image = imageUrls;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
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
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchProductName = async (req, res) => {
  try {
    const { name } = req.query;
    const nameCode = name.toLowerCase();
    const product = await Product.find({
      name: { $regex: nameCode, $options: "i" },
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.sortProduct = async (req, res) => {
  try {
    const product = await Product.find()
      .collation({ locale: "vi", strength: 1 })
      .sort({ name: 1 });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy các sản phẩm được xem nhiều nhất
exports.getPopularProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Số lượng sản phẩm muốn trả về

    const products = await Product.find()
      .sort({ views: -1 }) // Sắp xếp theo số lượt xem giảm dần
      .limit(limit)
      .populate("categoryId");

    if (products.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm nào" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.categoryId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
