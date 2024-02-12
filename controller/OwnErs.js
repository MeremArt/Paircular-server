const Product = require(`../model/Product`);

const { StatusCodes } = require("http-status-codes");

const createProduct = (req, res) => {
  res.send(`create product`);
};

const getAllproducts = (req, res) => {
  res.send(`list of products`);
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
