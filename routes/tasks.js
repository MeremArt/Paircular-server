const express = require("express");
const router = express.Router();

const { waitList, signIn, signUp, dashboard } = require("../controller/task");

const { uploadProductImage } = require("../controller/UploadProduct");

const {
  createProduct,
  getAllproducts,
  deleteProduct,
  editProduct,
} = require("../controller/OwnErs");

// Routes for authentication
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/waitlist", waitList);

// Route for dashboard
router.get("/dashboard", dashboard);

// Routes for product management
router.post("/uploads", uploadProductImage);
router
  .route("/products")
  .get(getAllproducts)
  .delete(deleteProduct)
  .patch(editProduct)
  .post(createProduct);

module.exports = router;
