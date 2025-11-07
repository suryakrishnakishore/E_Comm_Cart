export const getCart = async (req, res) => {
  try {
    const items = await CartItem.find().populate("product");
    const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    res.json({ items, total });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  try {
    let cartItem = await CartItem.findOne({ product: productId });
    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ product: productId, qty });
      await cartItem.save();
    }
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};
