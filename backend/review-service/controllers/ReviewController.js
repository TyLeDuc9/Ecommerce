const Review=require('../models/ReviewModel');
const Customer = require('../../customer-service/models/CustomerModel');
const Product = require('../../product-service/models/ProductsModels');
exports.createReview = async (req, res) => {
    try {
        const { describe, customerId, productId } = req.body;
        const newReview = new Review({ describe, customerId, productId});
        await newReview.save();

        res.status(201).json({
            message: 'Review created successfully',
            review: newReview,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('customerId').populate('productId');
        console.log(reviews);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('customerId').populate('productId');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { describe, customerId, productId } = req.body;
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { describe, customerId, productId },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({
            message: 'Review updated successfully',
            review,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};