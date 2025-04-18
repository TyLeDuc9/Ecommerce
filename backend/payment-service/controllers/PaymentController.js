const Payment = require('../models/PaymentModel');

exports.createPayment = async (req, res) => {
    try {
        const {  paymentDate,  amount,  paymentMethod, paymentStatus} = req.body;
        const newPayment = new Payment({  paymentDate,  amount,  paymentMethod, paymentStatus});
        await newPayment.save();

        res.status(201).json({
            message: 'Payment created successfully',
            payment: newPayment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const {  paymentDate,  amount,  paymentMethod, paymentStatus} = req.body;
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            {  paymentDate,  amount,  paymentMethod, paymentStatus},
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
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
};
