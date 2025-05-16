<<<<<<< HEAD
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

=======
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Import axios để gọi API

// Đăng ký tài khoản
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
<<<<<<< HEAD
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
=======
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
<<<<<<< HEAD
      role
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
=======
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
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
<<<<<<< HEAD
=======

// Đăng nhập
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
<<<<<<< HEAD
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
=======
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
<<<<<<< HEAD
      { expiresIn: '7d' }
=======
      { expiresIn: "7d" }
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
<<<<<<< HEAD
        role: user.role
      }
=======
        role: user.role,
      },
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

<<<<<<< HEAD
exports.getLoggedInUser = async (req, res) => {
    try {
      console.log("✅ req.user trong getLoggedInUser:", req.user);

        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.searchUsersByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Missing name parameter' });

    const users = await User.find({
      name: { $regex: name, $options: 'i' }  // tìm gần đúng, không phân biệt hoa thường
    }).select('-password');

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.sortUsersByName = async (req, res) => {
  try {
    const order = req.query.order === 'desc' ? -1 : 1; // mặc định asc
    const users = await User.find()
      .collation({ locale: 'vi', strength: 1 }) // để sắp xếp theo chuẩn tiếng Việt
      .sort({ name: order })
      .select('-password'); // không trả về password

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
=======
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
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
