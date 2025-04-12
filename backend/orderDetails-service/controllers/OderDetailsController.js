const OrderDetails = require('../models/OrderDetailsModel');

exports.createOrderDetails = async (req, res) => {
    try {
        const { orderId, productId, PaymentId, quantity, totalPrice } = req.body;
        const newOrderDetails = new OrderDetails({ orderId, productId, PaymentId, quantity, totalPrice });
        await newOrderDetails.save();
        res.status(201).json({
            message: 'Order Details created successfully',
            order: newOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderDetailsById = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderDetails = async (req, res) => {
    try {
        const { orderId, productId, PaymentId, quantity, totalPrice } = req.body;
        const orderDetails = await Order.findByIdAndUpdate(
            req.params.id,
            { orderId, productId, PaymentId, quantity, totalPrice },
            { new: true }
        );

        if (!orderDetails) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order updated successfully',
            orderDetails,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findByIdAndDelete(req.params.id);
        if (!orderDetails) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order Details deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
