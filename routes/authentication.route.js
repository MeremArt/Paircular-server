// installed packages
const router = require("express").Router();

// imported modules
const { verifyEmail, forgotPassword, resetPassword } = require("../controller/authentication.controller");


// Routes for authentication
router.post('/verify-email/:verificationToken', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:resetToken', resetPassword);

module.exports = router;