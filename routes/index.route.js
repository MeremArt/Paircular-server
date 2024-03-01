// installed packages
const router = require("express").Router();

// imported modules
const authRouter = require("./authentication.route");


router.use('/auth', authRouter);

module.exports = router;