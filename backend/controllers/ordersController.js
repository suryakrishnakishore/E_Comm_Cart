import CartItem from "../models/cartItem.js";
import Order from "../models/order.js";

export const checkout = async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    const total = cartItems.reduce(
      (sum, it) => sum + (it.price || 0) * (it.qty || 0),
      0
    );

    const order = await Order.create({
      name,
      email,
      total,
      timestamp: new Date(),
      items: cartItems,
    });

    // Clear the cart
    await CartItem.deleteMany({});

    res.json({
      orderId: order._id,
      name,
      email,
      total,
      timestamp: order.timestamp,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Checkout failed" });
  }
};
