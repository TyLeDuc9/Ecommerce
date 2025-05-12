const mongoose = require('mongoose');

// Định nghĩa schema cho Seller
const sellerSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true,
    },
    storeAddress: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
}, { timestamps: true });


module.exports = mongoose.model('Seller', sellerSchema); 
