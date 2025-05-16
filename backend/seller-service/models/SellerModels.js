const mongoose = require('mongoose');
const User = mongoose.model('User', require('../../user-service/models/UserModel').schema);
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
        ref: 'User',
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Seller', sellerSchema); 
