<<<<<<< HEAD
const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  birthday: { type: Date },
  gender: { type: String, enum: ["Nam", "Nữ", "Khác"], default: "Khác" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("Customer", CustomerSchema);
=======
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
>>>>>>> 8b2989e427217d1d72a1ba14425e1f3d8aca3053
