const Payment = require('../models/PaymentModel');

exports.createPayment = async (req, res) => {
      const { paymentMethod, paymentStatus } = req.body;

    try {
        const newPayment = new Payment({
            paymentMethod,
            paymentStatus
        });
        const savedPayment = await newPayment.save();
        res.status(201).json({
            message: 'Payment method created successfully',
            payment: savedPayment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tạo phương thức thanh toán' });
    }
};


exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const { paymentDate, paymentMethod, paymentStatus } = req.body;

        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            { paymentDate, paymentMethod, paymentStatus },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({
            message: 'Payment updated successfully',
            payment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};
// In your PaymentController.js
exports.getPaymentByMethod = async (req, res) => {
    const { paymentMethod } = req.params;

    try {
        // Find all payments with the specified paymentMethod
        const payments = await Payment.find({ paymentMethod });

        if (!payments.length) {
            return res.status(404).json({ message: 'No payments found for this method' });
        }

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};
