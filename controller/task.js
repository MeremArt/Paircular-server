const asyncWrapper = require("../middleware/Async");

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const nodemailer = require("nodemailer");

const Data = require(`../model/waitList`);

require("dotenv").config();

const jwt = require(`jsonwebtoken`);

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, ExistingUserError } = require("../error");

const waitList = asyncWrapper(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new BadRequestError("Please provide email and password");
  }

  const newData = new Data({ name, email });

  try {
    await newData.save();
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Data received and stored successfully.",
    });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error." });
  }
});

//Function to send email address
async function sendWelcomeEmail(email, name) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  const transporter = nodemailer.createTransport({
    service: `gmail`,
    auth: {
      user: process.env.EMAIL_USER, // email address
      pass: process.env.APP_PASSWORD, // password from gmail
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Welcome to Paircular Holmes`,
    html: `<!DOCTYPE html>
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
                <span class="preheader">Paircular Holmes</span>
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
                      <h2>Hello, ${capitalizedName}</h2>
                      <img
                        class="image"
                        src="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1707344763/mail-cover_dfvdjg.png"
                        alt="Paircular Holmes Image"
                      />
                      <br />
                      <br />
                      <p>
                        Welcome to the Innovative World of
                        <strong style="color: #80bcb5">Paircular Holmes</strong>
                        – where we address housing problems with a touch of
                        uniqueness! 🏡✨ We are thrilled to have you on board, and
                        we look forward to revolutionizing the way you explore and
                        find your dream home.
                      </p>
                      <br />
                      <p>
                        Our platform is designed to make your housing journey
                        seamless and enjoyable. Whether you are looking to buy,
                        rent, or explore real estate options, Paircular Holmes is
                        here for you.
                      </p>
                      <br />
                      <p>
                        If you have any questions or need assistance, our support
                        team is ready to help. Feel free to reach out to
                        [support@paircularholmes.com].
                      </p>
                      <br />
                      <p>Happy Home Hunting!</p>
                      <p>Paircular Holmes Team 🏡🔍</p>
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
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent successfully to:`, email);
  } catch (error) {
    console.error(`Error sending welcome email`, error.message);
    throw error;
  }
}
//signup
const signUp = asyncWrapper(async (req, res) => {
  const { name, email, profession, location, password } = req.body;

  if (!name || !email || !profession || !password) {
    throw new BadRequestError(
      "name, email, profession, and password are required fields."
    );
  }

  try {
    const existingUser = await Data.findOne({ email });
    if (existingUser) {
      throw new ExistingUserError(
        "Email is already registered. Please sign in."
      );
    }

    const newUser = new Data({
      name,
      email,
      profession,
      location,
      password,
    });
    await newUser.save();
    // Send welcome email
    await sendWelcomeEmail(newUser.email, newUser.name);
    const token = newUser.createJWT();
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Sign-up successful",
      token,
      newUser: { name: newUser.name },
    });
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

const signIn = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("password and email are required fields.");
  }

  try {
    const existingUser = await Data.findOne({ email });

    if (!existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User not found. Please sign up." });
    }
    const isPasswordCorrect = await existingUser.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = existingUser.createJWT();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Sign-in successful",
      token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

const dashboard = asyncWrapper(async (req, res) => {
  console.log("fix-it");
});

module.exports = {
  waitList,
  signIn,
  signUp,
  dashboard,
};
