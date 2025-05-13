const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/CustomerController");

// Debug middleware for routes
router.use((req, res, next) => {
  console.log('Customer Route:', req.method, req.path);
  next();
});

// Specific routes first
router.get("/by-user/:userId", (req, res, next) => {
  console.log('Handling by-user route');
  CustomerController.getCustomerByUserId(req, res, next);
});

router.put("/update-by-user/:userId", (req, res, next) => {
  console.log('Handling update-by-user route');
  CustomerController.updateCustomerByUserId(req, res, next);
});

// Generic routes after
router.post("/create", CustomerController.createCustomer);
router.get("/all", CustomerController.getAllCustomers);
router.get("/search", CustomerController.searchCustomer);
router.get("/sort", CustomerController.sortCustomer);
router.get("/:id", CustomerController.getCustomerById);
router.put("/update/:id", CustomerController.updateCustomer);
router.delete("/delete/:id", CustomerController.deleteCustomer);

module.exports = router;
