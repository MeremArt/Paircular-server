const Product = require(`../model/Product`);
const { BadRequestError, ExistingUserError } = require("../error");
const { StatusCodes } = require("http-status-codes");
const Products = require(`../model/Product`);

const createProduct = async (req, res) => {
  const { location, amount, occupants } = req.body;
  if (!location || !amount || !occupants) {
    throw new BadRequestError("Fill the inputs ");
  }
  try {
    const existingProduct = await Product.findOne({
      location,
      amount,
      occupants,
    });
    if (existingProduct) {
      throw new ExistingUserError(
        "product with the same properties already exists"
      );
    }
    const newProduct = await Product.create({
      location,
      amount,
      occupants,
    });
    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getAllproducts = async (req, res) => {
  try {
    const products = await product.find({});
    res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "product not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

const editProduct = (req, res) => {
  res.send(`edit product`);
};

module.exports = {
  createProduct,
  deleteProduct,
  editProduct,
  getAllproducts,
};
