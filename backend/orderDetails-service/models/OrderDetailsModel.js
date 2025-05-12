const mongoose = require('mongoose');
const Order = mongoose.model('Order', require('../../order-service/models/OrderModel').schema);
const Product = mongoose.model('Product', require('../../product-service/models/ProductsModels').schema);
const Payment = mongoose.model('Payment', require('../../payment-service/models/PaymentModel').schema);
const orderDetailsSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('OrderDetails', orderDetailsSchema);
