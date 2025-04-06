const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    nameCategory: {
        type: String,
        require: true
    },
    describe: {
        type: String,
        require: true
    },
    imageCategory: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Category", categorySchema);
