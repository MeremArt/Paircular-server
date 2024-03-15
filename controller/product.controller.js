const productService = require(`../service/product.service`);
const { StatusCodes } = require("http-status-codes");

const searchIndexProducts = async (req, res) => {
    try {
        const { location, availabilityDate, occupants, page = 1, limit = 5 } = req.query;
        const query = {
            location: location || { $exists: true },
            availabilityDate: { $gte: new Date(availabilityDate || new Date()) },
            occupants: { $gte: occupants || 1 },
        };

        const options = {
            limit: parseInt(limit),
            skip: (page - 1) * limit,
        };

        const products = await productService.getProducts(query, options);

        const totalCount = await productService.countProducts(query)

        const totalPages = Math.ceil(totalCount / limit);

        res.status(StatusCodes.OK).json({
            products,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    searchIndexProducts,
};
