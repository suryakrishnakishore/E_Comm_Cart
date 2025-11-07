import express from "express";
import { checkout } from "../controllers/ordersController.js";

const router = express.Router();

router.get("/", checkout);

export default router;