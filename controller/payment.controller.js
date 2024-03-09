// imported modules
const PaymentService = require('../service/payment.service');

const startPayment = async (req, res) => {
    try {
        const response = await PaymentService.startPayment(req.body);
        return res.status(201).json({ status: 'Success', data: response });
    } catch (error) {
        return res.status(500).json({ status: 'Failed', message: error.message });
    }
}

const createPayment = async (req, res) => {
    try {
        const response = await PaymentService.createPayment(req.query);
        return res.status(201).json({ status: 'Success', data: response });
    } catch (error) {
        return res.status(500).json({ status: 'Failed', message: error.message });
    }
}

const getPayment = async (req, res) => {
    try {
        const response = await PaymentService.paymentReciept(req.body);
        return res.status(201).json({ status: 'Success', data: response });
    } catch (error) {
        return res.status(500).json({ status: 'Failed', message: error.message });
    }
}

module.exports = {
    startPayment,
    createPayment,
    getPayment
}