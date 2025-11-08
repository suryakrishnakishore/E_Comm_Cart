import express from "express";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeCartItem);
router.delete("/", clearCart);

export default router;