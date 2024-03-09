require("dotenv").config();
require("express-async-errors");

const helmet = require(`helmet`);
const cors = require(`cors`);
const xss = require(`xss-clean`);
const rateLimit = require(`express-rate-limit`);
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const connectDB = require(`./db/connect`);
const authenticateUser = require(`./middleware/auth`);
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const tasksRouter = require(`./routes/tasks`);
const indexRouter = require(`./routes/index.route.js`);

const notFoundMiddleware = require(`./middleware/not-found.js`);
const errorMiddleware = require(`./middleware/error-handler.js`);

// Middleware
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

app.use(`/api/v1/paircular-holmes`, tasksRouter);
app.use(`/api/v1/paircular-holmes`, indexRouter);


// Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 7000;

// Graceful shutdown
process.on("SIGINT", () => {
  mongoose.connection.close()
    .then(() => {
      console.log("\nMongoDB disconnected through app termination");
      process.exit(0);
    });
});

// Connect to MongoDB Atlas using environment variable
const atlasConnectionUri = process.env.MONGO_URL;

const start = async () => {
  try {
    await connectDB(atlasConnectionUri);
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
