import express from "express";
import { addToCart, getCart, removeCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/", removeCartItem);

export default router;