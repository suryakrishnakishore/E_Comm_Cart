import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // [{ id, productId, name, price, qty }]
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoadingCart(true);
    try {
      const res = await client.get("/cart");
      const payload = res.data;
      const items = (payload.items || []).map((it) => ({
        id: it._id,
        productId: it.product?._id || it.product,
        name: it.product?.name ?? it.product?.name ?? "Unknown",
        price: it.product?.price ?? 0,
        qty: it.qty,
      }));
      setCartItems(items);
    } catch (err) {
      console.error("fetchCart error", err);
      setError("Could not fetch cart");
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart (calls backend) — qty default 1
  const addToCart = async (product, qty = 1) => {
    try {
      await client.post("/cart", {
        productId: product._id ?? product.id,
        qty,
      });
      await fetchCart();
      setIsCartOpen(true);
    } catch (err) {
      console.error("addToCart error", err);
      setError("Failed to add to cart");
    }
  };

  // Remove specific cart item by cart item id
  const removeFromCart = async (cartItemId) => {
    try {
      await client.delete(`/cart/${cartItemId}`);
      await fetchCart();
    } catch (err) {
      console.error("removeFromCart error", err);
      setError("Failed to remove item");
    }
  };

  // Update cart item qty
  const updateCartItem = async (cartItemId, qty) => {
    try {
      await client.put(`/cart/${cartItemId}`, { qty });
      await fetchCart();
    } catch (err) {
      console.error("updateCartItem error", err);
      setError("Failed to update item");
    }
  };

  const checkout = async (customer = { name: "", email: "" }) => {
  try {
    const payloadItems = cartItems.map((it) => ({
      productId: it.productId,
      qty: it.qty,
      price: it.price,
    }));

    const res = await client.post("/checkout", {
      cartItems: payloadItems,
      name: customer.name,
      email: customer.email,
    });

    setLastReceipt(res.data);
    setShowReceipt(true);
    await fetchCart(); // backend clears cart
    return res.data;
  } catch (err) {
    console.error("checkout error", err);
    setError("Checkout failed");
    throw err;
  }
};

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        total,
        isCartOpen,
        setIsCartOpen,
        showReceipt,
        setShowReceipt,
        lastReceipt,
        checkout,
        fetchCart,
        loadingCart,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
