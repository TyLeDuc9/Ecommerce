const Payment = require('../models/PaymentModel');

exports.createPayment = async (req, res) => {
    try {
        const { paymentDate, amount, paymentMethodId, paymentStatusId } = req.body;
        
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }

        const newPayment = new Payment({ paymentDate, amount, paymentMethodId, paymentStatusId });
        await newPayment.save();

        res.status(201).json({
            message: 'Payment created successfully',
            payment: newPayment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('paymentMethodId')
            .populate('paymentStatusId');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('paymentMethodId')
            .populate('paymentStatusId');
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
        const { paymentDate, amount, paymentMethodId, paymentStatusId } = req.body;
        
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }

        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            { paymentDate, amount, paymentMethodId, paymentStatusId },
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
