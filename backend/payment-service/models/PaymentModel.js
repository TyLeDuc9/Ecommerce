const mongoose = require('mongoose');
const { getVietnamTime } = require('../until/timeUtils'); 
const paymentSchema = new mongoose.Schema({
  paymentDate: {
    type: Date,
    required: true, 
    default: getVietnamTime,  
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'bank', 'credit'],
    required: true,

  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Success', 'Failed'],
  }
}, { timestamps: true });



module.exports=mongoose.model('Payment', paymentSchema);

