
const Product = require("../models/ProductsModels");
const cloudinary = require("cloudinary").v2;
const Category = require("../../category-service/models/CategoryModel");
const User = require("../../user-service/models/UserModel");
const Seller = require("../../seller-service/models/SellerModels");

// Tạo mới một sản phẩm
exports.createProduct = async (req, res) => {
<<<<<<< HEAD
  try {
    const { name, price, describe, status, categoryId, quantity, views } =
      req.body;
    let imageUrls = [];
=======
    try {
        const { name, price, describe, status, categoryId, quantity ,userId, sellerId  } = req.body;
        let imageUrls = []; 
>>>>>>> 8b2989e427217d1d72a1ba14425e1f3d8aca3053

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
      userId, sellerId 
    
    });

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
<<<<<<< HEAD
    const products = await Product.find().populate("categoryId");
=======
    const products = await Product.find().populate('categoryId').populate('sellerId').populate('userId');
    console.log(products);  // Thêm dòng này để kiểm tra kết quả trả về
>>>>>>> 8b2989e427217d1d72a1ba14425e1f3d8aca3053
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD
// Lấy sản phẩm theo ID
=======

>>>>>>> 8b2989e427217d1d72a1ba14425e1f3d8aca3053
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryId')
      .populate('sellerId')
      .populate('userId');

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
<<<<<<< HEAD
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
=======
    try {
        const { name, price, describe, status, categoryId , quantity,  userId, sellerId } = req.body;
        let updatedFields = { name, price, describe, status, categoryId, quantity,  userId, sellerId  };
>>>>>>> 8b2989e427217d1d72a1ba14425e1f3d8aca3053

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

<<<<<<< HEAD
// Lấy các sản phẩm được xem nhiều nhất
=======



>>>>>>> 8b2989e427217d1d72a1ba14425e1f3d8aca3053
exports.getPopularProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; 

    const products = await Product.find()
      .sort({ views: -1 }) 
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
<<<<<<< HEAD

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.categoryId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
=======
exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .populate('categoryId', 'name')
      .populate('sellerId', 'storeName storeAddress phone image') 

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.status(200).json(product);

  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi server' });
  }
};
exports.getProductsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const products = await Product.find({ sellerId })
      .populate('categoryId', 'name')
      .populate('sellerId', 'storeName storeAddress phone image') 
      .select('name price image categoryId');

    res.status(200).json(products);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm theo seller:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi server' });
  }
};
>>>>>>> 8b2989e427217d1d72a1ba14425e1f3d8aca3053
