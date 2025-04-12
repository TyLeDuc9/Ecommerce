const PaymentStatus = require('../models/PaymentStatusModel');

exports.createPaymentStatus = async (req, res) => {
    try {
        const {  namePaymentStatus} = req.body;
        const newPaymentStatus = new PaymentStatus({  namePaymentStatus});
        await newPaymentStatus.save();

        res.status(201).json({
            message: 'PaymentStatus created successfully',
            paymentStatus: newPaymentStatus,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPaymentStatuss = async (req, res) => {
    try {
        const paymentStatuss = await PaymentStatus.find();
        res.status(200).json(paymentStatuss);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPaymentStatusById = async (req, res) => {
    try {
        const paymentStatus = await PaymentStatus.findById(req.params.id);
        if (!paymentStatus) {
            return res.status(404).json({ message: 'PaymentStatus not found' });
        }
        res.status(200).json(paymentStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const {  namePaymentStatus} = req.body;
        const paymentStatus = await PaymentStatus.findByIdAndUpdate(
            req.params.id,
            {  namePaymentStatus},
            { new: true }
        );

        if (!paymentStatus) {
            return res.status(404).json({ message: 'PaymentStatus not found' });
        }

        res.status(200).json({
            message: 'PaymentStatus updated successfully',
            paymentStatus,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePaymentStatus = async (req, res) => {
    try {
        const paymentStatus = await PaymentStatus.findByIdAndDelete(req.params.id);
        if (!paymentStatus) {
            return res.status(404).json({ message: 'PaymentStatus not found' });
        }

        res.status(200).json({ message: 'PaymentStatus deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
