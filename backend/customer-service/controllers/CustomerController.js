<<<<<<< HEAD
const Customer = require('../models/CustomerModel.js');

exports.createCustomer = async (req, res) => {
    try {
        const { fullName, phone, address, birthday, gender, userId } = req.body;
        
        // Ensure data is valid before saving
        if (!fullName || !phone || !address || !birthday || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingCustomer = await Customer.findOne({ userId: userId });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer for this user already exists' });
        }

        const newCustomer = new Customer({
            fullName,
            phone,
            address,
            birthday,
            gender,
            userId,
        });

        await newCustomer.save();
        res.status(201).json({
            message: 'Customer created successfully',
            customer: newCustomer,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('userId');
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('userId');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hàm mới để lấy customer theo userId
exports.getCustomerByUserId = async (req, res) => {
    try {
        const customer = await Customer.findOne({ userId: req.params.userId });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found. You can create one.' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.updateCustomer = async (req, res) => {
    const { fullName, phone , address, birthday, gender} = req.body;
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            {fullName, phone , address, birthday, gender},
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({
            message: 'Customer updated successfully',
            customer
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.searchCustomer = async (req, res) => {
    try {
        const { name, phone } = req.query;
        let query = {};
        if (name && typeof name === 'string') {
            query.name = { $regex: name, $options: 'i' };
        }
        if (phone && typeof phone === 'string') {
            query.phone = { $regex: phone, $options: 'i' };
        }
        const customers = await Customer.find(query);
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.sortCustomer = async (req, res) => {
    try {
        const { sortBy, sortOrder } = req.query;

        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
            sort['createdAt'] = -1;
        }

        const customers = await Customer.find().sort(sort).populate('user');
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
=======
const Customer = require("../models/CustomerModel.js");

// Tạo customer mới
exports.createCustomer = async (req, res) => {
  try {
    const { fullName, email, phone, address, birthday, gender, userId } =
      req.body;

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
      gender: gender || "Khác",
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

// Lấy tất cả customer
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate("userId");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy customer theo id
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("userId");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy customer theo userId
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

// Cập nhật customer
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

// Xóa customer
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

// Tìm kiếm customer
exports.searchCustomer = async (req, res) => {
  try {
    const { fullName, phone } = req.query;
    let query = {};
    if (fullName && typeof fullName === "string") {
      query.fullName = { $regex: fullName, $options: "i" };
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

// Sắp xếp customer
exports.sortCustomer = async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query;
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    } else {
      sort["createdAt"] = -1;
    }
    const customers = await Customer.find().sort(sort).populate("userId");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function updateCustomerByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    // Tìm customer theo userId
    const customer = await Customer.findOne({ userId: userId });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Cập nhật customer
    Object.assign(customer, updateData);
    await customer.save();

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
exports.updateCustomerByUserId = updateCustomerByUserId;
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
