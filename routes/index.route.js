// installed packages
const router = require("express").Router();

// imported modules
const authRouter = require("./authentication.route");
const paymentRouter = require("./payment.route");
const productRouter = require("./product.route");


router.use('/auth', authRouter);
router.use('/payment', paymentRouter);
router.use('/product', productRouter);

module.exports = router;