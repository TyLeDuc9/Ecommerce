const TransportMethod = require('../models/TransportMethodModel');

exports.createTransportMethod = async (req, res) => {
    try {
        const {  nameTransporMethod,  estimatedTransport,  feeTransport } = req.body;
        const newTransportMethod = new TransportMethod({  nameTransporMethod,  estimatedTransport,  feeTransport });
        await newTransportMethod.save();

        res.status(201).json({
            message: 'TransportMethod created successfully',
            transportMethod: newTransportMethod,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTransportMethods = async (req, res) => {
    try {
        const transportMethods = await TransportMethod.find();
        res.status(200).json(transportMethods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTransportMethodById = async (req, res) => {
    try {
        const transportMethod = await TransportMethod.findById(req.params.id);
        if (!transportMethod) {
            return res.status(404).json({ message: 'TransportMethod not found' });
        }
        res.status(200).json(transportMethod);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTransportMethod = async (req, res) => {
    try {
        const {  nameTransporMethod,  estimatedTransport,  feeTransport  } = req.body;
        const transportMethod = await TransportMethod.findByIdAndUpdate(
            req.params.id,
            {  nameTransporMethod,  estimatedTransport,  feeTransport  },
            { new: true }
        );

        if (!transportMethod) {
            return res.status(404).json({ message: 'TransportMethod not found' });
        }

        res.status(200).json({
            message: 'TransportMethod updated successfully',
            transportMethod,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTransportMethod = async (req, res) => {
    try {
        const transportMethod = await TransportMethod.findByIdAndDelete(req.params.id);
        if (!transportMethod) {
            return res.status(404).json({ message: 'TransportMethod not found' });
        }

        res.status(200).json({ message: 'TransportMethod deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
