const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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