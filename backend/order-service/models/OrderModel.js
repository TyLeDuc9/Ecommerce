const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default:Date.now,
        required: true
    },
    deliveryDate: {
        type: Date
    },
    totalOrder: {
        type: Number,
        required: true
    },
    statusOrder: {
        type: String,
        enum: ['Pending Confirmation', 'Shipping', 'Delivered', 'Canceled']
    },
    discountId: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Discount' 
    }],
    cartId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cart' 
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    paymentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Payment' 
    }
    
},{ timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

