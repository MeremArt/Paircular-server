const express = require(`express`);
const router = express.Router();

const { waitList } = require(`../controller/task`);

router.route(`/submit`).post(waitList);

module.exports = router;
