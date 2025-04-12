const mongoose = require('mongoose');
const paymentStatusSchema = new mongoose.Schema({
    namePaymentStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Success', 'Failed'],
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('PaymentStatus', paymentStatusSchema);