const Product = require('../model/Product');

class ProductService {
    async createProduct(productData) {
        try {
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            throw error;
        }
    }

    async getProducts(query, options) {
        try {
            return await Product.find(query, null, options);
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