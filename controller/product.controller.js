const productService = require(`../service/product.service`);
const { StatusCodes } = require("http-status-codes");

const searchIndexProducts = async (req, res) => {
    try {
        const { location, availabilityDate, occupants, page = 1, limit = 5 } = req.query;

        const query = {};

        if (location) query.location = location // Default to empty string if location is not provided

        if (occupants) {
            query.occupants = parseInt(occupants)
        } else {
            query.occupants = { $gte: 1 }
        }; // Default to at least 1 occupant if not provided

        if (availabilityDate) {
            query.availabilityDate = { $gte: new Date(availabilityDate) }
        } else {
            query.availabilityDate = { $gte: new Date() } // Default to current date if availabilityDate is not provided
        }

        // console.log({ query })
        // console.log({ date: new Date().toUTCString() })
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
                totalResults: totalCount,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const existingProduct = await productService.getProductById(productId);

        if (!existingProduct) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: "Product not found" });
        }
        res.status(StatusCodes.OK).json({ success: true, data: existingProduct });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
}


module.exports = {
    searchIndexProducts,
    getProductById,
};
