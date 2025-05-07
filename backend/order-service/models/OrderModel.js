const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', require('../../customer-service/models/CustomerModel').schema);
const Discount = mongoose.model('Discount', require('../../discount-service/models/DiscountModel').schema);
const Cart = mongoose.model('Cart', require('../../cart-service/models/CartModel').schema);
const Payment = mongoose.model('Payment', require('../../payment-service/models/PaymentModel').schema);
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
        ref: 'Cart',
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    paymentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Payment' ,
        required: null
    }
    
},{ timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

