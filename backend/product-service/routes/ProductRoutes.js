const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductControllers");
const {
  authenticate,
  authorizeRoles,
} = require("../../user-service/middlewares/AuthUser");
const { upload } = require("../config/multer");

// Tìm kiếm sản phẩm theo tên
router.get("/search", ProductController.searchProductName);

// Sắp xếp sản phẩm
router.get("/sort", ProductController.sortProduct);

// Lấy tất cả sản phẩm
router.get("/all", ProductController.getAllProducts);

// Lấy sản phẩm theo seller (nếu có)
router.get("/sellers/:sellerId", ProductController.getProductsBySeller);

// Lấy chi tiết sản phẩm theo productId (nếu có)
router.get("/seller/:productId", ProductController.getProductDetails);

// Lấy sản phẩm phổ biến
router.get("/popular", ProductController.getPopularProducts);

// Lấy sản phẩm theo category
router.get("/by-category/:categoryId", ProductController.getProductsByCategory);

// Kiểm tra views của sản phẩm (dùng cho mục đích kiểm tra, có thể bỏ nếu không cần)
router.get("/check-views", async (req, res) => {
  try {
    const Product = require("../models/ProductModel");
    const products = await Product.find({}, "name views");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy sản phẩm theo ID (route động phải đặt CUỐI CÙNG)
router.get("/:id", ProductController.getProductById);

// Tạo sản phẩm mới
router.post(
  "/create",
  authenticate,
  authorizeRoles("admin", "seller"),
  upload.array("image", 6),
  ProductController.createProduct
);

// Cập nhật sản phẩm
router.put(
  "/update/:id",
  authenticate,
  authorizeRoles("admin", "seller"),
  upload.array("image", 6),
  ProductController.updateProduct
);

// Xóa sản phẩm
router.delete(
  "/delete/:id",
  authenticate,
  authorizeRoles("admin", "seller"),
  ProductController.deleteProduct
);

module.exports = router;
