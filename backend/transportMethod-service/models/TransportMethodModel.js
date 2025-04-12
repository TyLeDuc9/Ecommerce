const mongoose = require('mongoose')
const transportMethodSchema=mongoose.Schema({
    nameTransporMethod:{
        type:String,
        required:true
    },
    estimatedTransport: {
        type: Date,
        required: true,
    },
    feeTransport: {
        type: Number, 
        required: true,
      },
})
module.exports=mongoose.model('TransportMethod', transportMethodSchema);