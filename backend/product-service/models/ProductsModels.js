const mongoose = require("mongoose");
const Customer = mongoose.model(
  "Customer",
  require("../../customer-service/models/CustomerModel").schema
);
const Category = mongoose.model(
  "Category",
  require("../../category-service/models/CategoryModel").schema
);
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    describe: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0, // Giá trị mặc định là 0
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
