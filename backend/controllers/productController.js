import Product from "../models/product.js"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200)
                .json({
                    success: "true",
                    message: "Products fetched successfully.",
                    products
                });
    } catch (error) {
        console.log("Error fetching products: ", error);
        return res.status(500)
                .json({ error: "Error fetching products." });
    }
}


