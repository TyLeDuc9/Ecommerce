const mongoose = require('mongoose');
const transportSchema=new mongoose.Schema({
    status:{
        type:String,
        required:true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    transportMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TransportMethod',
        required: true
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true  
    },

})
module.exports=mongoose.model('Transport', transportSchema);