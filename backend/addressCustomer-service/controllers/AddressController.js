const Address = require('../models/AddressModel');

exports.createAddress = async (req, res) => {
    try {
        const { cityAddress, describe, customerId } = req.body;
        const newAddress = new Address({ cityAddress, describe, customerId });
        await newAddress.save();

        res.status(201).json({
            message: 'Address created successfully',
            Address: newAddress,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllAddresss = async (req, res) => {
    try {
        const addresss = await Address.find();
        res.status(200).json(addresss);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const { cityAddress, describe, customerId } = req.body;
        const address = await Address.findByIdAndUpdate(
            req.params.id,
            { cityAddress, describe, customerId },
            { new: true }
        );

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({
            message: 'Address updated successfully',
            address,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
