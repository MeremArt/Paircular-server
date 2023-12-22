const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const tasksRouter = require(`./routes/tasks`);
const notFoundMiddleware = require(`./middleware/not-found.js`);
const errorMiddleware = require(`./middleware/error-handler.js`);
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas using environment variable
const atlasConnectionUri = process.env.MONGO_URL;

mongoose.connect(atlasConnectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
