import CartItem from "../models/cartItem.js";

export const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate({
      path: "product",
      select: "name price",
      strictPopulate: false,
    });

    const safeItems = cartItems.map((item) => {
      const product = item.product || { _id: null, name: "Unknown", price: 0 };
      return {
        _id: item._id,
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
        },
        qty: item.qty || 1,
      };
    });

    const total = safeItems.reduce(
      (sum, item) => sum + (item.product.price || 0) * (item.qty || 1),
      0
    );

    res.json({ items: safeItems, total });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
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

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;

    if (qty == null || isNaN(qty)) {
      return res.status(400).json({ message: "qty must be provided as a number" });
    }

    if (qty <= 0) {
      await CartItem.findByIdAndDelete(id);
      return res.json({ message: "Item removed (qty <= 0)" });
    }

    const updated = await CartItem.findByIdAndUpdate(
      id,
      { $set: { qty } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Cart item not found" });

    res.json(updated);
  } catch (error) {
    console.error("updateCartItem error:", error);
    res.status(500).json({ message: "Failed to update cart item", error: error.message });
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

export const clearCart = async (req, res) => {
  try {
    await CartItem.deleteMany({});
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("clearCart error:", error);
    res.status(500).json({ message: "Failed to clear cart", error: error.message });
  }
};
