const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', require('../../customer-service/models/CustomerModel').schema);
const addressSchema=new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    describe:{
        type:String,
        required:true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',  
        required: true
    }
})
module.exports=mongoose.model('Address', addressSchema);