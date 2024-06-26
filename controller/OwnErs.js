const Product = require(`../model/Product`);
const productService = require(`../service/product.service`);
const { BadRequestError, ExistingUserError } = require("../error");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  const { location, amount, image, occupants, availabilityDate } = req.body;
  if (!location || !amount || !occupants || !availabilityDate) {
    throw new BadRequestError("Fill the inputs ");
  }
  try {
    const existingProduct = await Product.findOne({
      location,
      amount,
      occupants,
      availabilityDate,
    });
    if (existingProduct) {
      throw new ExistingUserError(
        "product with the same properties already exists"
      );
    }
    const newProduct = await Product.create({
      location,
      image,
      amount,
      occupants,
      availabilityDate,
    });
    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const getAllproducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
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

const editProduct = async (req, res) => {
  const productId = req.params.productId;
  const { location, amount, occupants, availabilityDate } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { location, amount, occupants, availabilityDate },
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  editProduct,
  getAllproducts,
};
