const Product = require('../model/Product');

class ProductService {
    // create product
    async createProduct(productData) {
        try {
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            throw error;
        }
    }

    // get all products
    async getProducts(query, options) {
        try {
            return await Product.find(query, null, options);
        } catch (error) {
            throw error;
        }
    }

    // get single product
    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async countProducts(query) {
        try {
            return await Product.countDocuments(query);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductService();