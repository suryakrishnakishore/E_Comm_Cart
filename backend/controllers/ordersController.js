export const checkout = async (req, res) => {
  const { cartItems } = req.body;
  try {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );

    const receipt = {
      total,
      timestamp: new Date(),
    };

    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: "Checkout failed" });
  }
};
