const Discount = require('../models/DiscountModel.js');

exports.createDiscount = async (req, res) => {
    try {
        const { description, discountType, startDate, endDate, discountAmount } = req.body;

        const newDiscount = new Discount({ description, discountType, startDate, endDate, discountAmount });

        await newDiscount.save();

        res.status(201).json({
            message: 'Discount created successfully',
            discount: newDiscount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.status(200).json(discounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findById(req.params.id);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.status(200).json(discount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDiscount = async (req, res) => {
    try {
        const { description, discountType, startDate, endDate, discountAmount } = req.body;

        const discount = await Discount.findByIdAndUpdate(
            req.params.id,
            { description, discountType, startDate, endDate, discountAmount },
            { new: true }
        );

        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        res.status(200).json({
            message: 'Discount updated successfully',
            discount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDiscount = async (req, res) => {
    try {
        const discount = await Discount.findByIdAndDelete(req.params.id);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        res.status(200).json({ message: 'Discount deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
