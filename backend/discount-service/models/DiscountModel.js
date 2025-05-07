const mongoose = require('mongoose');
const discountSchema = new mongoose.Schema({
    description: { type: String },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discountAmount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);