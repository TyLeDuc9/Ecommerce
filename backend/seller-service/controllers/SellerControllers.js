const Seller = require('../models/SellerModels');
const User = require("../../user-service/models/UserModel");
const Order = require("../../order-service/models/OrderModel");
const Product = require("../../product-service/models/ProductsModels");
const OrderDetails = require("../../orderDetails-service/models/OrderDetailsModel");
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
exports.createSeller = async (req, res) => {
  try {
    const { storeName, storeAddress, phone, userId } = req.body;
    console.log('Request Body:', req.body);
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'sellers',
        });
        imageUrls.push(result.secure_url);
      }
    }

    const newSeller = new Seller({
      storeName,
      storeAddress,
      phone,
      image: imageUrls,
      userId,
    });

    await newSeller.save();

    res.status(201).json({
      message: 'Tạo seller thành công',
      seller: newSeller,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().populate('userId'); // Liên kết với bảng User
    if (sellers.length === 0) {
      return res.status(404).json({ message: 'No sellers found' });
    }
    res.status(200).json({ sellers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getSellerById = async (req, res) => {
  try {
    // const seller = await Seller.findById(req.params.id).populate('userId');
    const seller = await Seller.findById(req.params.id)
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json(seller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getSellerByUserId = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);

    const seller = await Seller.findOne({ userId: userId });

    if (!seller) {
      return res.status(404).json({ message: 'Không tìm thấy người bán.' });
    }

    res.status(200).json(seller);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server.', error: err.message });
  }
};
exports.updateSeller = async (req, res) => {
  try {
    const { storeName, storeAddress, phone } = req.body;
    let updatedFields = { storeName, storeAddress, phone };

    if (req.files && req.files.length > 0) {
      let imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'sellers',
        });
        imageUrls.push(result.secure_url);
      }
      updatedFields.image = imageUrls;
    }

    const seller = await Seller.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({
      message: 'Seller updated successfully',
      seller,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({ message: 'Seller deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

