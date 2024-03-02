// installed packages
require("dotenv").config();
const jwt = require(`jsonwebtoken`);
const crypto = require('crypto');

// imported modules
const asyncWrapper = require("../middleware/Async");
const Data = require(`../model/waitList`);
const { StatusCodes } = require("http-status-codes");
const { forgotPasswordMailOptions } = require('../mailTemplates/forgotPassword.template');
const { resetPasswordMailOptions } = require('../mailTemplates/resetPassword.template');
const { createTransporter } = require('../configs/nodemailer.config');

// authentication controllers


// forgot password functionality
const forgotPassword = asyncWrapper(async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await Data.findOne({ email: email });
        if (!existingUser) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "User not found. Please sign up." });
        }

        // generate and attach a reset token to the user's profile
        const resetToken = existingUser.generateResetPasswordToken()
        await existingUser.save()

        // sends a mail to the user *includes reset link with token*
        const transporter = createTransporter();
        const mailOptions = forgotPasswordMailOptions(existingUser, resetToken);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to send reset email' });
            }

            res.json({ status: 'success', message: 'Reset email sent successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error_message: error.message });
    }

});

const resetPassword = asyncWrapper(async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    try {
        const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const existingUser = await Data.findOne({ passwordResetToken: passwordResetToken, passwordResetTokenExpires: { $gt: Date.now() } });

        if (!existingUser) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "Reset link expired or Invalid" });
        }

        existingUser.password = password;
        existingUser.passwordResetToken = undefined;
        existingUser.passwordResetTokenExpires = undefined;
        existingUser.passwordChangedAt = Date.now();

        await existingUser.save()

        // sends a confirmation mail to the user 
        const transporter = createTransporter();
        const mailOptions = resetPasswordMailOptions(existingUser);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return next(res.status(500).json({ error: 'Failed to send reset email' }));
            }

            res.json({ status: 'success', message: 'Reset email sent successfully' });
        });

        // login the user
        const token = existingUser.createJWT();

        res.json({ success: 'true', message: 'Password reset successfully', token: token });

    } catch (err) {
        existingUser.passwordResetToken = undefined;
        existingUser.passwordResetTokenExpires = undefined;
        await existingUser.save()

        res.json({ success: 'false', error: err.message });

    }
});

module.exports = {
    forgotPassword,
    resetPassword
}