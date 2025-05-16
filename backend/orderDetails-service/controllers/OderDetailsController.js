<<<<<<< HEAD
const mongoose = require('mongoose');
const OrderDetails = require('../models/OrderDetailsModel');
const Seller = require('../../seller-service/models/SellerModels');
exports.createOrderDetails = async (req, res) => {
    try {
        const { orderId, productId, quantity, totalPrice } = req.body;

        // In ra dữ liệu để kiểm tra
        console.log("Dữ liệu nhận được từ frontend:", req.body);

        const newOrderDetails = new OrderDetails({
            orderId,
            productId,
            quantity,
            totalPrice,
        });

        // Lưu OrderDetails vào database
        await newOrderDetails.save();

        res.status(201).json({
            message: 'Order Details created successfully',
            orderDetails: newOrderDetails,
        });
    } catch (error) {
        console.error('Error creating OrderDetails:', error);
        res.status(500).json({ message: error.message });
    }
=======
const OrderDetails = require('../models/OrderDetailsModel');

// exports.createOrderDetails = async (req, res) => {
//     try {
//         const { orderId, productId, quantity, totalPrice } = req.body;
//         console.log("Dữ liệu OrderDetails nhận được:", req.body); 
//         const newOrderDetails = new OrderDetails({ orderId, productId, quantity, totalPrice });
//         await newOrderDetails.save();

//         res.status(201).json({
//             message: 'Order Details created successfully',
//             orderDetails: newOrderDetails,
//         });
//     } catch (error) {
//         console.error('Error creating OrderDetails:', error);
//         res.status(500).json({ message: error.message });
//     }
// };
exports.createOrderDetails = async (req, res) => {
  try {
    const { orderId, productId, quantity, totalPrice } = req.body;

    // In ra dữ liệu để kiểm tra
    console.log("Dữ liệu nhận được từ frontend:", req.body);

    const newOrderDetails = new OrderDetails({
      orderId,
      productId,
      quantity,
      totalPrice,
    });

    // Lưu OrderDetails vào database
    await newOrderDetails.save();

    res.status(201).json({
      message: 'Order Details created successfully',
      orderDetails: newOrderDetails,
    });
  } catch (error) {
    console.error('Error creating OrderDetails:', error);
    res.status(500).json({ message: error.message });
  }
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
};

exports.getAllOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.find()
<<<<<<< HEAD
            .populate('orderId', 'quantity')
            .populate('productId', 'name image quantity')

=======
            .populate('orderId')
            .populate('productId')
            .populate('paymentId');
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6

        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderDetailsById = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findById(req.params.id)
            .populate('orderId')
            .populate('productId')
<<<<<<< HEAD

=======
            .populate('paymentId');
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6

        if (!orderDetails) {
            return res.status(404).json({ message: 'Order Details not found' });
        }
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderDetails = async (req, res) => {
    try {
<<<<<<< HEAD
        const { orderId, productId, quantity, totalPrice } = req.body;
        const orderDetails = await OrderDetails.findByIdAndUpdate(
            req.params.id,
            { orderId, productId, quantity, totalPrice },
=======
        const { orderId, productId,  quantity, totalPrice } = req.body;
        const orderDetails = await OrderDetails.findByIdAndUpdate(
            req.params.id,
            { orderId, productId,  quantity, totalPrice },
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
            { new: true }
        );

        if (!orderDetails) {
            return res.status(404).json({ message: 'Order Details not found' });
        }

        res.status(200).json({
            message: 'Order Details updated successfully',
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
            return res.status(404).json({ message: 'Order Details not found' });
        }

        res.status(200).json({ message: 'Order Details deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
<<<<<<< HEAD
exports.getOrderDetailsByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderDetails = await OrderDetails.find({ orderId }).populate('productId')
        //   .populate('orderId') 

        if (!orderDetails || orderDetails.length === 0) {
            return res.status(404).json({ message: 'No order details found for this order' });
        }

        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error fetching order details by orderId:', error);
        res.status(500).json({ message: error.message });
    }
};
=======
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
