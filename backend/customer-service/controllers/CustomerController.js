const Customer = require("../models/CustomerModel.js");
exports.createCustomer = async (req, res) => {
  try {
    const { fullName, email, phone, address, birthday, gender, userId } = req.body;

    // Kiểm tra userId bắt buộc
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newCustomer = new Customer({
      fullName,
      email,
      phone: phone || "",
      address: address || "",
      birthday,
      gender: gender || "other",
      userId,
    });

    await newCustomer.save();

    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomerByUserId = async (req, res) => {
  try {
    const customer = await Customer.findOne({ userId: req.params.userId });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { fullName, phone, address, birthday, gender } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { fullName, phone, address, birthday, gender },
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.searchCustomer = async (req, res) => {
  try {
    const { name, phone } = req.query;
    let query = {};
    if (name && typeof name === "string") {
      query.name = { $regex: name, $options: "i" };
    }
    if (phone && typeof phone === "string") {
      query.phone = { $regex: phone, $options: "i" };
    }
    const customers = await Customer.find(query);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.sortCustomer = async (req, res) => {
  try {
    const customer = await Customer.find().sort({ name: -1 });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomerByUserId = async (req, res) => {
  try {
    console.log("Received request to update customer by userId:", req.params.userId);
    console.log("Request body:", req.body);
    
    const { fullName, phone, address, birthday, gender } = req.body;
    
    // Validate gender
    if (gender && !["Nam", "Nữ", "Khác"].includes(gender)) {
      console.log("Invalid gender value:", gender);
      return res.status(400).json({ 
        message: "Invalid gender value. Must be one of: Nam, Nữ, Khác" 
      });
    }

    console.log("Finding and updating customer with userId:", req.params.userId);
    const customer = await Customer.findOneAndUpdate(
      { userId: req.params.userId },
      { 
        fullName, 
        phone: phone || "", 
        address: address || "", 
        birthday, 
        gender: gender || "Khác" 
      },
      { new: true }
    );
    
    if (!customer) {
      console.log("Customer not found for userId:", req.params.userId);
      return res.status(404).json({ message: "Customer not found" });
    }
    
    console.log("Customer updated successfully:", customer);
    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: error.message });
  }
};
