require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express(`./db/connect.js`);

const mongoose = require("mongoose");
const connectDB = require(`./db/connect`);
const authenticateUser = require(`./middleware/auth`);
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const fileUpload = require("express-fileupload");
const tasksRouter = require(`./routes/tasks`);

const notFoundMiddleware = require(`./middleware/not-found.js`);
const errorMiddleware = require(`./middleware/error-handler.js`);

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));
app.use(`/api/v1/paircular-holmes`, tasksRouter);

//ErrorHandling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 7000;

// Graceful shutdown

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB disconnected through app termination");
    process.exit(0);
  });
});

//Connect to MongoDB Atlas using environment variable
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
