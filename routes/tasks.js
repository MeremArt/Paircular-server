const express = require("express");
const router = express.Router();

const { waitList, signIn, signUp, dashboard } = require("../controller/task");

const authMiddleware = require(`../middleware/auth`);
// Route for signing up
router.post("/signup", signUp);

// Route for signing in
router.post("/signin", signIn);

// Route for signing in
router.post("/waitlist", waitList);

router.route("/dashboard").get(authMiddleware, dashboard);

module.exports = router;
