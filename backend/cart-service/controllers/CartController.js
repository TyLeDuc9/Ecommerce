<<<<<<< HEAD
const Product = require('../../product-service/models/ProductsModels');
const Cart = require('../models/CartModel');
exports.createCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();

    res.status(200).json({ message: "Cập nhật giỏ hàng thành công", cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate('customerId').populate('productId');
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('customerId').populate('productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

=======
const Product = require("../../product-service/models/ProductsModels");
const Cart = require("../models/CartModel");

//tao cart
exports.createCart = async (req, res) => {
  try {
    const { quantity, productId, userId } = req.body;

    // 1. Tìm customer theo userId
    let customer = await Customer.findOne({ userId });
    if (!customer) {
      // Nếu chưa có, tạo mới customer (lấy thông tin từ req.body hoặc để mặc định)
      customer = new Customer({
        userId,
        fullName: req.body.fullName || "No Name",
        email: req.body.email || "",
        phone: req.body.phone || "",
        address: req.body.address || "",
        birthday: req.body.birthday || null,
        gender: req.body.gender || "Khác",
      });
      await customer.save();
    }

    // 2. Kiểm tra cart đã tồn tại chưa
    const existingCart = await Cart.findOne({
      customerId: customer._id,
      productId,
    });

    if (existingCart) {
      existingCart.quantity += quantity;
      await existingCart.save();

      return res.status(200).json({
        message: "Đã cập nhật số lượng sản phẩm trong giỏ",
        cart: existingCart,
      });
    }

    // 3. Tạo mới cart
    const newCart = new Cart({
      quantity,
      productId,
      customerId: customer._id,
      userId,
    });
    await newCart.save();

    res.status(201).json({
      message: "Giỏ hàng đã được tạo thành công",
      cart: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
// Lấy tất cả cart
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("customerId")
      .populate("productId");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy cart theo id
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("customerId")
      .populate("productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật cart
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
exports.updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

<<<<<<< HEAD
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(i => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Cart item updated successfully', cart });
=======
    const cart = await Cart.findOne({ userId, productId });

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cart.quantity = quantity;
    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD

exports.updateCartById = async (req, res) => {
  try {
    const { id } = req.params; // id của item
    const { quantity } = req.body;

    const cart = await Cart.findOne({ 'items._id': id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const item = cart.items.id(id);
    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Cart item updated successfully', cart });
=======
// Cập nhật cart theo id
exports.updateCartById = async (req, res) => {
  try {
    const { id } = req.params; // cartItemId
    const { quantity } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res
      .status(200)
      .json({ message: "Cart updated successfully", cart: updatedCart });
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD
exports.deleteAllCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.deleteMany({ userId });
    res.status(200).json({ message: "Xóa toàn bộ giỏ hàng thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params; // id của item

    const cart = await Cart.findOne({ 'items._id': id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== id);
    await cart.save();

    res.status(200).json({ message: 'Xóa mục giỏ hàng thành công', cart });
=======
// exports.removeCart = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { productId } = req.body;

//         const cart = await Cart.findOne({ userId, productId });

//         if (!cart) {
//             return res.status(404).json({ message: 'Cart item not found' });
//         }
//         await cart.remove();

//         res.status(200).json({
//             message: 'Cart item removed successfully'
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Xóa cart theo id
exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Không tìm thấy mục giỏ hàng" });
    }
    res.status(200).json({ message: "Xóa mục giỏ hàng thành công" });
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

<<<<<<< HEAD
exports.getCartByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này' });
    }

    return res.status(200).json(cart);
=======
// Xóa cart theo userId
exports.getCartByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const carts = await Cart.find({ userId: userId }).populate("productId");
    if (!carts || carts.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy giỏ hàng cho người dùng này" });
    }
    return res.status(200).json(carts);
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
};
<<<<<<< HEAD
 
=======
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
