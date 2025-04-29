const Cart = require('../models/CartModel');

exports.createCart = async (req, res) => {
    try {
        const { sumCart, productId, customerId } = req.body;
        const newCart = new Cart({ sumCart, productId, customerId });
        await newCart.save();

        res.status(201).json({
            message: 'Cart created successfully',
            cart: newCart,
        });
    } catch (error) {
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
        const { sumCart, productId, customerId  } = req.body;
        const cart = await Cart.findByIdAndUpdate(
            req.params.id,
            { sumCart, productId, customerId },
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
