// installed packages
const router = require("express").Router();

// imported modules
const { forgotPassword, resetPassword } = require("../controller/authentication.controller");


// Routes for authentication
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:resetToken', resetPassword);

module.exports = router;