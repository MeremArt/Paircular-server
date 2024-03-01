function resetPasswordMailOptions(user) {
    return {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Password reset notification`,
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
            Password for ${user.email} has been reset successfully.
            </h3>
        </div>
      </body>
    </html>
    `,
    }

};

module.exports = {
    resetPasswordMailOptions
}