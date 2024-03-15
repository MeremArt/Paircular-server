const router = require("express").Router();

const { searchIndexProducts } = require("../controller/OwnErs");

// Routes for product management
router.get('/searchResults', searchIndexProducts);

module.exports = router;
