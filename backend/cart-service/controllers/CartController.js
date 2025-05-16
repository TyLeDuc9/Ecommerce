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

exports.updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCartByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
};
 