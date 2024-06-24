const router = require("express").Router();

const { searchIndexProducts, getProductById } = require("../controller/product.controller");
const {
    createProduct,
    getAllproducts,
    deleteProduct,
    editProduct,
} = require("../controller/OwnErs");

// Routes for product management
router.get('/searchResults', searchIndexProducts);
router.get('/getAllProducts', getAllproducts);
router.get('/getProduct/:productId', getProductById);
router.post('/createProduct', createProduct);
router.patch('/editProduct/:productId', editProduct);
router.delete('/deleteProduct/:productId', deleteProduct);

module.exports = router;
