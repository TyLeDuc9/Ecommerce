const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', require('../../customer-service/models/CustomerModel').schema);
const Product = mongoose.model('Product', require('../../product-service/models/ProductsModels').schema);
const cartSchema = new mongoose.Schema({
    sumCart: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    customerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', 
        required: true
    },

});

module.exports = mongoose.model('Cart', cartSchema);
