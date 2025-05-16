const mongoose = require('mongoose');
<<<<<<< HEAD
const User = mongoose.model('User', require('../../user-service/models/UserModel').schema);
=======

// Định nghĩa schema cho Seller
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
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
<<<<<<< HEAD
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
=======
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
    }
}, { timestamps: true });


module.exports = mongoose.model('Seller', sellerSchema); 
