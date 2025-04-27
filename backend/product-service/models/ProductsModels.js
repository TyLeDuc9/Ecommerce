const mongoose = require('mongoose');
const Category = require('../../category-service/models/CategoryModel');
const Customer = require('../../customer-service/models/CustomerModel');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    describe: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
