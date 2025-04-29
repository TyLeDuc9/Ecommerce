const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', require('../../customer-service/models/CustomerModel').schema);
const Product = mongoose.model('Product', require('../../product-service/models/ProductsModels').schema);
const reviewSchema = new mongoose.Schema({
    describe: {
        type: String,
        required: false
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model('Review', reviewSchema);