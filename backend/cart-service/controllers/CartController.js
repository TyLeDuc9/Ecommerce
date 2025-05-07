const Cart = require('../models/CartModel');


exports.createCart = async (req, res) => {
    try {
      const { quantity, productId, customerId } = req.body;
      const existingCart = await Cart.findOne({ customerId, productId });
    
  
      if (existingCart) {
        existingCart.quantity += quantity;
        await existingCart.save();
  
        return res.status(200).json({
          message: 'Đã cập nhật số lượng sản phẩm trong giỏ',
          cart: existingCart,
        });
      }
      const newCart = new Cart({ quantity, productId, customerId });
      await newCart.save();
  
      res.status(201).json({
        message: 'Giỏ hàng đã được tạo thành công',
        cart: newCart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
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
        const { quantity, productId, customerId  } = req.body;
        const cart = await Cart.findByIdAndUpdate(
            req.params.id,
            { quantity, productId, customerId },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({
            message: 'Cart updated successfully',
            cart,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
