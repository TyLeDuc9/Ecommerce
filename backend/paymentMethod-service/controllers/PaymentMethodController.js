const PaymentMethod = require('../models/PaymentMethodModel');

exports.createPaymentMethod = async (req, res) => {
    try {
        const {  namePaymentMethod} = req.body;
        const newPaymentMethod = new PaymentMethod({  namePaymentMethod});
        await newPaymentMethod.save();

        res.status(201).json({
            message: 'PaymentMethod created successfully',
            paymentMethod: newPaymentMethod,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.status(200).json(paymentMethods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPaymentMethodById = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            return res.status(404).json({ message: 'PaymentMethod not found' });
        }
        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePaymentMethod = async (req, res) => {
    try {
        const {  namePaymentMethod} = req.body;
        const paymentMethod = await PaymentMethod.findByIdAndUpdate(
            req.params.id,
            {  namePaymentMethod},
            { new: true }
        );

        if (!paymentMethod) {
            return res.status(404).json({ message: 'PaymentMethod not found' });
        }

        res.status(200).json({
            message: 'PaymentMethod updated successfully',
            paymentMethod,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
        if (!paymentMethod) {
            return res.status(404).json({ message: 'PaymentMethod not found' });
        }

        res.status(200).json({ message: 'PaymentMethod deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
