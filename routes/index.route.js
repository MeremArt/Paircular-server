// installed packages
const router = require("express").Router();

// imported modules
const authRouter = require("./authentication.route");
const paymentRouter = require("./payment.route");


router.use('/auth', authRouter);
router.use('/payment', paymentRouter);

module.exports = router;