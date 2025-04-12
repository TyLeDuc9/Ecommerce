const Order = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
    try {
        const { orderDate, deliveryDate, totalOrder, statusOrder, discountId, cartId, customerId, paymentId } = req.body;
        const newOrder = new Order({ orderDate, deliveryDate, totalOrder, statusOrder, discountId, cartId, customerId, paymentId });
        await newOrder.save();
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { orderDate, deliveryDate, totalOrder, statusOrder, discountId, cartId, customerId, paymentId } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderDate, deliveryDate, totalOrder, statusOrder, discountId, cartId, customerId, paymentId },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order updated successfully',
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
