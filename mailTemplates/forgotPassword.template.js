function forgotPasswordMailOptions(user, passwordResetToken) {
    return {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Reset your password`,
        sender: `Paircular Holmes`,
        html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Paircular Holmes</title>
      </head>
      <body>
        <div>
            <h3>
            Click the link to reset your password: https://paircularholmes.com/reset-password/${passwordResetToken}
            </h3><br><h3>
            This link expires in 5 minutes.
            </h3>
        </div>
      </body>
    </html>
    `,
    }

};

module.exports = {
    forgotPasswordMailOptions
}