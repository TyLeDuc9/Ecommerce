const Order = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
  try {
    const { totalOrder, discountId, customerId, paymentId, status, shippingInfo, transportId, userId } = req.body;
    const newOrder = new Order({
      totalOrder,
      status,
      shippingInfo,
      discountId,
      customerId,
      paymentId,
      transportId, userId


    });

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
    const orders = await Order.find()
      .populate('discountId')
      .populate('cartId')
      .populate('customerId')
      .populate('paymentId')
      .populate('transportId')
      .populate('userId')

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('discountId')
      .populate('cartId')
      .populate('customerId')
      .populate('paymentId')
      .populate('transportId')
      .populate('userId')

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
    const { totalOrder, discountId, customerId, paymentId, status, shippingInfo, transportId, userId } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { totalOrder, discountId, customerId, paymentId, status, shippingInfo, transportId, userId },
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
