const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', require('../../customer-service/models/CustomerModel').schema);
const Product = mongoose.model('Product', require('../../product-service/models/ProductsModels').schema);
const User = mongoose.model('User', require('../../user-service/models/UserModel').schema);
const cartSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }


});

module.exports = mongoose.model('Cart', cartSchema);
