const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', require('../../customer-service/models/CustomerModel').schema);
const Discount = mongoose.model('Discount', require('../../discount-service/models/DiscountModel').schema);
const Payment = mongoose.model('Payment', require('../../payment-service/models/PaymentModel').schema);
const Transport = mongoose.model('Transport', require('../../transport-service/models/TransportModel').schema);
const User = mongoose.model('User', require('../../user-service/models/UserModel').schema);
const orderSchema = new mongoose.Schema({
    totalOrder: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'cancelled'],
        default: 'pending'
    },
    shippingInfo: {
        name: String,
        phone: String,
        province: String,
        address: String
    },
    discountId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
        required: false,
    }],
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    transportId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transport',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }



}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

