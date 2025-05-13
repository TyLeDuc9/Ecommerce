const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, default: "" }, // Cho phép rỗng khi tạo mới
    address: { type: String, default: "" }, // Cho phép rỗng khi tạo mới
    birthday: { type: Date },
    gender: { type: String, enum: ["Nam", "Nữ", "Khác"], default: "Khác" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
