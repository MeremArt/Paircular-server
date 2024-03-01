const nodemailer = require('nodemailer');

function createTransporter() {
    return nodemailer.createTransport({
        service: `gmail`,
        auth: {
            user: process.env.EMAIL_USER, // email address
            pass: process.env.APP_PASSWORD, // password from gmail
        },
    });
}

module.exports = {
    createTransporter
};
