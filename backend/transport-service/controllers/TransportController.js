const Transport = require('../models/TransportModel');

exports.createTransport = async (req, res) => {
    try {
        const { status, fee, shippingCarrier} = req.body;
        const newTransport = new Transport({status, fee, shippingCarrier });
        await newTransport.save();

        res.status(201).json({
            message: 'Transport created successfully',
            transport: newTransport,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTransports = async (req, res) => {
    try {
        const transports = await Transport.find();
        res.status(200).json(transports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTransportById = async (req, res) => {
    try {
        const transport = await Transport.findById(req.params.id);
        if (!transport) {
            return res.status(404).json({ message: 'Transport not found' });
        }
        res.status(200).json(transport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTransport = async (req, res) => {
    try {
        const {status, fee, shippingCarrier} = req.body;
        const transport = await Transport.findByIdAndUpdate(
            req.params.id,
            { status, fee, shippingCarrier},
            { new: true }
        );

        if (!transport) {
            return res.status(404).json({ message: 'Transport not found' });
        }

        res.status(200).json({
            message: 'Transport updated successfully',
            transport,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTransport = async (req, res) => {
    try {
        const transport = await Transport.findByIdAndDelete(req.params.id);
        if (!transport) {
            return res.status(404).json({ message: 'Transport not found' });
        }

        res.status(200).json({ message: 'Transport deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// In your TransportController.js
exports.getTransportByMethod = async (req, res) => {
    const { transportMethod } = req.params;

    try {
        // Assuming transportMethod is stored in the 'shippingCarrier' field
        const transports = await Transport.find({ shippingCarrier: transportMethod });

        if (!transports.length) {
            return res.status(404).json({ message: 'No transports found for this method' });
        }

        res.status(200).json(transports);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

