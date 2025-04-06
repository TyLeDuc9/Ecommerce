const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nameProduct: {
        type: String,
        required: true,
    },
    priceProduct: {
        type: Number, // Sửa Float thành Number
        required: true,
    },
    describe: {
        type: String,
        required: true,
    },
    imageProduct: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);
