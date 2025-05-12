const mongoose = require('mongoose');
const User = mongoose.model('User', require('../../user-service/models/UserModel').schema);
const customerSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }

}, { timestamps: true })

module.exports = mongoose.model('Customer', customerSchema);
