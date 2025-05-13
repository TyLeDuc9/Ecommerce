const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Import axios

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'customer', // Default to customer if role not specified
    });
    await newUser.save();

    // If role is customer (default or specified), create customer record
    if (newUser.role === "customer") {
      try {
        // Call customer-service API to create customer
        const customerResponse = await axios.post(`${process.env.CUSTOMER_SERVICE_URL}/customer/api/create`, {
          fullName: newUser.name,
          email: newUser.email,
          userId: newUser._id,
          phone: "",
          address: "",
          birthday: null,
          gender: "Khác"
        });

        // If customer creation was successful, include customer info in response
        if (customerResponse.data) {
          return res.status(201).json({ 
            message: "User and customer profile created successfully",
            user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role
            },
            customer: customerResponse.data.customer
          });
        }
      } catch (error) {
        console.error("Error creating customer:", error.message);
        // If customer creation fails, still return user creation success
        return res.status(201).json({ 
          message: "User created successfully but customer profile creation failed. Please try updating your profile later.",
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
          }
        });
      }
    }

    // If not a customer role, just return user creation success
    res.status(201).json({ 
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
