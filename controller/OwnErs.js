const Product = require(`../model/Product`);

const { StatusCodes } = require("http-status-codes");
const Products = require(`../model/Product`);
const createProduct = (req, res) => {
  res.send(`create product`);
};

const getAllproducts = async (req, res) => {
  const products = await Products.find({});
  res.status(StatusCodes.OK).json({ products });
};

const deleteProduct = (req, res) => {
  res.send(`delete product`);
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
