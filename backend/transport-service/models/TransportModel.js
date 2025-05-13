const mongoose = require('mongoose');
const transportSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true,
        min: 0
    },
    shippingCarrier: {
        type: String,
        required: true
    }

}, {timestamps:true})
module.exports = mongoose.model('Transport', transportSchema);