function forgotPasswordMailOptions(user, passwordResetToken) {
  return {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Reset your password`,
    sender: `Paircular Holmes`,
    html: ` <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Paircular Holmes</title>
      <style media="all" type="text/css">
        /* Global Resets */
        body {
          font-family: Helvetica, sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 16px;
          line-height: 1.3;
          color: #27272a;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
  
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%;
        }
  
        table td {
          font-family: Helvetica, sans-serif;
          font-size: 16px;
          vertical-align: top;
        }
  
        /* Body & Container */
        body {
          background-color: #f8f8f8;
          margin: 0;
          padding: 0;
        }
  
        .body {
          background-color: #f8f8f8;
          width: 100%;
        }
        .mcnButtonContent:hover {
          background-color: #247ba0; /* Change hover color here */
        }
        .container {
          margin: 0 auto !important;
          max-width: 600px;
          padding: 0;
          padding-top: 24px;
          width: 600px;
        }
  
        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 600px;
          padding: 0;
        }
  
        /* Header, Footer, Main */
        .main {
          background: #ffffff;
          border: 1px solid #eaebed;
          border-radius: 16px;
          width: 100%;
        }
  
        .wrapper {
          box-sizing: border-box;
          padding: 24px;
        }
  
        .image {
          width: 100%;
        }
  
        .footer {
          clear: both;
          padding-top: 24px;
          text-align: center;
          width: 100%;
        }
  
        .footer td,
        .footer p,
        .footer span,
        .footer a {
          color: #27272a;
          font-size: 16px;
          text-align: center;
        }
  
        /* Typography */
        p {
          font-family: Helvetica, sans-serif;
          font-size: 16px;
          font-weight: normal;
          margin: 0;
          margin-bottom: 16px;
        }
  
        a {
          color: #0867ec;
          text-decoration: underline;
        }
  
        h2 {
          font-family: Helvetica, sans-serif;
          font-size: 30px;
          font-weight: 900;
        }
  
        /* Responsive and Mobile Friendly Styles */
        @media only screen and (max-width: 640px) {
          .main p,
          .main td,
          .main span {
            font-size: 16px !important;
          }
          .wrapper {
            padding: 8px !important;
          }
          .content {
            padding: 0 !important;
          }
          .container {
            padding: 0 !important;
            padding-top: 8px !important;
            width: 100% !important;
          }
          .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
          .mcnButtonContent:hover {
            font-size: 16px;
            padding: 24px 48px 24px 48px;
            border-radius: 30px;
            background-color: #fa6060; /* Change hover color here */
          }
        }
      </style>
    </head>
    <body>
      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="body"
      >
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
              <!-- Start Centered White Container -->
  
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="main"
              >
                <!-- Start Main Content Area -->
                <tr>
                  <td class="wrapper">
                    <img
                      class="image"
                      src="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1707344763/mail-cover_dfvdjg.png"
                      alt="Paircular Holmes Image"
                    />
                    <center>
                      <h2>Forgot Password?</h2>
                      <p>
                        Not to worry, we got you! Let&rsquo;s get you a new
                        password.
                      </p>
                      <table
                        style="
                          border-collapse: separate !important;
                          mso-table-lspace: 0;
                          mso-table-rspace: 0;
                          -ms-text-size-adjust: 50%;
                          -webkit-text-size-adjust: 50%;
                          border-radius: 48px;
                          width: 80%;
                          background-color: #005147;
                        "
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="mcnButtonContent"
                              style="
                                mso-line-height-rule: exactly;
                                -ms-text-size-adjust: 100%;
                                -webkit-text-size-adjust: 100%;
                                font-family: 'Asap', Helvetica, sans-serif;
                                font-size: 16px;
                                padding: 24px 48px 24px 48px;
                              "
                              align="center"
                              valign="middle"
                            >
                              <a
                                class="mcnButton"
                                style="
                                  mso-line-height-rule: exactly;
                                  -ms-text-size-adjust: 100%;
                                  -webkit-text-size-adjust: 100%;
                                  display: block;
                                  color: #ffffff;
                                  font-weight: normal;
                                  text-decoration: none;
                                  letter-spacing: 1px;
                                  line-height: 100%;
                                  text-align: center;
                                  text-transform: uppercase;
                                "
                                title="https://paircular-app-git-main-meremart.vercel.app/reset-password?token=${passwordResetToken}"
                                href="https://paircular-app-git-main-meremart.vercel.app/reset-password?token=${passwordResetToken}"
                                target="_blank"
                                rel="noopener"
                                >Reset password</a
                              >
                            </td>
                          
                          </tr>
                          <p>Link expires after 5 mins</p>
                        </tbody>
                      </table>
                    </center>
                  </td>
                </tr>
                <!-- End Main Content Area -->
              </table>
  
              <!-- Start Footer -->
              <div class="footer">
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                ></table>
              </div>
              <!-- End Footer -->
  
              <!-- End Centered White Container -->
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
  
`,
  };
}

module.exports = {
  forgotPasswordMailOptions,
};
