// installed packages
const router = require('express').Router();

// imported modules
const { startPayment, createPayment, getPayment } = require('../controller/payment.controller');

router.post('/', startPayment);
router.get('/createPayment', createPayment);
router.get('/paymentDetails', getPayment);

module.exports = router;