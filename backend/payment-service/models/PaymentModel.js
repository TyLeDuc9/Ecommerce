const mongoose = require('mongoose');
const PaymentStatus = mongoose.model('PaymentStatus', require('../../paymentStatus-service/models/PaymentStatusModel').schema);
const PaymentMethod = mongoose.model('PaymentMethod', require('../../paymentMethod-service/models/PaymentMethodModel').schema);
const { getVietnamTime } = require('../until/timeUtils'); 
const paymentSchema = new mongoose.Schema({
    paymentDate: {
        type: Date,
        required: true, 
        default: getVietnamTime,  
    },
    amount: {
        type: Number,
        required: true,
        min: 0, 
    },
    paymentMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: true,
    },
    paymentStatusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentStatus',
        required: true,
    },
});

module.exports=mongoose.model('Payment', paymentSchema);

