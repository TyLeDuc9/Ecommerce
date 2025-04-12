const mongoose = require('mongoose');
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
    },
    paymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: true,
    },
    paymentStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentStatus',
        required: true,
    },
});

module.exports=mongoose.model('Payment', paymentSchema);

