const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Import axios để gọi API

// Đăng ký tài khoản
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
      role: role || "customer", // Mặc định là customer nếu không truyền role
    });
    await newUser.save();

    // Nếu là customer thì tự động tạo customer profile
    if (newUser.role === "customer") {
      try {
        const customerResponse = await axios.post(
          `${process.env.CUSTOMER_SERVICE_URL}/customer/api/create`,
          {
            fullName: newUser.name,
            email: newUser.email,
            userId: newUser._id,
            phone: "",
            address: "",
            birthday: null,
            gender: "Khác",
          }
        );

        if (customerResponse.data) {
          return res.status(201).json({
            message: "User and customer profile created successfully",
            user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
            },
            customer: customerResponse.data.customer,
          });
        }
      } catch (error) {
        console.error("Error creating customer:", error.message);
        // Nếu tạo customer thất bại vẫn trả về user đã tạo
        return res.status(201).json({
          message:
            "User created successfully but customer profile creation failed. Please try updating your profile later.",
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        });
      }
    }

    // Nếu không phải customer chỉ trả về user
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng nhập
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

// Lấy thông tin user đang đăng nhập
exports.getLoggedInUser = async (req, res) => {
  try {
    // req.user được gán từ middleware authenticate
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
