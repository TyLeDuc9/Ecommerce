const mongoose = require('mongoose');
const paymentMethodSchema = new mongoose.Schema({
    namePaymentMethod: {
        type: String,
        enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Mobile Payment', "Cash on Delivery"],
        required: true,
        unique: true,
    },
    
})
module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);