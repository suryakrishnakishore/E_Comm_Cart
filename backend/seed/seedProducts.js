import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import connectDB from "../libs/database.js";

dotenv.config();

await connectDB();

const products = [
  { name: "Wireless Mouse", price: 599, description: "Ergonomic and smooth", imageUrl: "/images/mouse.png" },
  { name: "Mechanical Keyboard", price: 1299, description: "RGB backlit keys", imageUrl: "/images/keyboard.png" },
  { name: "Bluetooth Headphones", price: 1999, description: "Noise cancelling", imageUrl: "/images/headphones.png" },
  { name: "Laptop Stand", price: 899, description: "Adjustable aluminum stand", imageUrl: "/images/stand.png" },
  { name: "USB-C Cable", price: 299, description: "Fast charging 1m cable", imageUrl: "/images/cable.png" },
  { name: "Portable SSD", price: 4999, description: "1TB high-speed storage", imageUrl: "/images/ssd.png" },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedProducts();
