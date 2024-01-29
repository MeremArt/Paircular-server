const express = require("express");
const router = express.Router();

const { waitList, signIn, signUp, dashboard } = require("../controller/task");

// Route for signing up
router.post("/signup", signUp);

// Route for signing in
router.post("/signin", signIn);

// Route for signing in
router.post("/waitlist", waitList);

router.route("/dashboard").get(dashboard);

module.exports = router;
