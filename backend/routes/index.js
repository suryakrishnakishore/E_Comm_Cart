import express from "express";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/checkout", orderRoutes)
export default router;