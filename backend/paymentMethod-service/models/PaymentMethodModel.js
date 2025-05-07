const mongoose = require('mongoose');
const paymentMethodSchema = new mongoose.Schema({
    namePaymentMethod: {
        type: String,
        required: true,
        unique: true,
    },
    
})
module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);