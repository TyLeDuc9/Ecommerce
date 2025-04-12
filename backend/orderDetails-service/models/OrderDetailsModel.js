const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true  
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('OrderDetails', orderDetailsSchema);
