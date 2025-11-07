import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: Number,
    },
  ],
  total: Number,
  name: String,
  email: String,
  timestamp: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
