const mongoose = require('mongoose');
const reviewSchema=new mongoose.Schema({
    describe:{
        type:String,
        required:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})
module.exports = mongoose.model("Review", reviewSchema);