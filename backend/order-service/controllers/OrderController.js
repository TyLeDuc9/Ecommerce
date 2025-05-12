const Order = require('../models/OrderModel'); 
const OrderDetails = require('../../orderDetails-service/models/OrderDetailsModel'); 

// exports.createOrder = async (req, res) => {
//   try {
//     console.log("➡️ Dữ liệu từ frontend:", req.body);
//     const { totalOrder, discountId, customerId, paymentId, status, shippingInfo, transportId, userId } = req.body;
//     const transportCosts = {
//       GHN: 35000,
//       GHTK: 30000,
//       ViettelPost: 25000,
//     };
//     const transportCost = transportCosts[transportId] || 0;
//     const finalTotal = totalOrder + transportCost;

//     const newOrder = new Order({
//       totalOrder: finalTotal,
//       status,
//       shippingInfo,
//       discountId,
//       customerId,
//       paymentId,
//       transportId,
//       userId,
//     });

//     await newOrder.save();
//     console.log("✅ Đơn hàng đã lưu:", savedOrder);
//     res.status(201).json({
//       message: 'Order created successfully',
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ message: error.message });
//   }
// };
exports.createOrder = async (req, res) => {
  try {
    console.log("➡️ Dữ liệu từ frontend:", req.body);

    const { totalOrder, discountId, customerId, paymentId, status, shippingInfo, transportId, userId } = req.body;
    const transportCosts = {
      GHN: 35000,
      GHTK: 30000,
      ViettelPost: 25000,
    };
    const transportCost = transportCosts[transportId] || 0;
    const finalTotal = totalOrder + transportCost;

    const newOrder = new Order({
      totalOrder: finalTotal,
      status,
      shippingInfo,
      discountId,
      customerId,
      paymentId,
      transportId,
      userId,
    });

    // Lưu đơn hàng vào cơ sở dữ liệu
    await newOrder.save();

    console.log("✅ Đơn hàng đã lưu:", newOrder);  // Sửa ở đây, dùng newOrder thay cho savedOrder

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('discountId')
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
exports.getTransportByOrderId = async (req, res) => {
  try {
    // Tìm đơn hàng theo ID và populate thông tin transportId
    const order = await Order.findById(req.params.id).populate('transportId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Lấy thông tin transportId từ đơn hàng
    const transport = order.transportId;

    // Trả về thông tin phương thức vận chuyển
    res.status(200).json(transport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateOrderTransport = async (req, res) => {
  try {
    const { transportId } = req.body;  // Lấy transportId từ request body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { transportId },  // Cập nhật transportId vào đơn hàng
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Phương thức vận chuyển đã được cập nhật',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};