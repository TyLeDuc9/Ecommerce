const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  require("../../user-service/models/UserModel").schema
);
const Seller = mongoose.model(
  "Seller",
  require("../../seller-service/models/SellerModels").schema
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
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    views: { type: Number, default: 0 },

    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
