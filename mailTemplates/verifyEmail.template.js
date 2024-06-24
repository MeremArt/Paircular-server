function verifyEmailMailOptions(user) {
    return {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Email verified notification`,
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
            ${user.email} has been verified successfully.
            </h3>
        </div>
      </body>
    </html>
    `,
    }

};

module.exports = {
    verifyEmailMailOptions
}