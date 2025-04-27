const Customer = require('../models/CustomerModel.js');
exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone, birthday, gender } = req.body;

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newCustomer = new Customer({
            name,
            email,
            phone,
            birthday,
            gender
        });

        await newCustomer.save();

        res.status(201).json({
            message: 'Customer created successfully',
            customer: newCustomer
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
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { name, email, phone, birthday, gender } = req.body;

        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, birthday, gender },
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
exports.sortCustomer=async(req, res)=>{
    try{
        const customer=await Customer.find().sort({name:-1});
        res.json(customer);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
