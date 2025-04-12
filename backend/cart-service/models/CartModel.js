const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    sumCart: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    customerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', 
        required: true
    },

});

module.exports = mongoose.model('Cart', cartSchema);
