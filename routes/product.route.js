const router = require("express").Router();

const { searchIndexProducts } = require("../controller/product.controller");

// Routes for product management
router.get('/searchResults', searchIndexProducts);

module.exports = router;
