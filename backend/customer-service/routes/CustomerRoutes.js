const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/CustomerController");
// const { authenticate } = require("../../user-service/middlewares/AuthUser");

// Debug middleware (nếu cần kiểm tra log request, có thể bật/tắt)
// router.use((req, res, next) => { next(); });

// Các route đặc biệt
router.get("/by-user/:userId", CustomerController.getCustomerByUserId);
// router.put("/update-by-user/:userId", CustomerController.updateCustomerByUserId); // Nếu có

// Các route chung
router.post("/create", CustomerController.createCustomer);
router.get("/all", CustomerController.getAllCustomers);
router.get("/search", CustomerController.searchCustomer);
router.get("/sort", CustomerController.sortCustomer);
router.get("/:id", CustomerController.getCustomerById);
router.put("/update/:id", CustomerController.updateCustomer);
router.delete("/delete/:id", CustomerController.deleteCustomer);

module.exports = router;
