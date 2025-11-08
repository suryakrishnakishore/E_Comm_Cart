import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
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
        name: it.product?.name ?? it.name,
        price: it.product?.price ?? it.price,
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

  const removeFromCart = async (cartItemId) => {
    try {
      await client.delete(`/cart/${cartItemId}`);
      await fetchCart();
    } catch (err) {
      console.error("removeFromCart error", err);
      setError("Failed to remove item");
    }
  };

  const checkout = async () => {
    try {
      const payloadItems = cartItems.map((it) => ({
        productId: it.productId,
        qty: it.qty,
      }));
      const res = await client.post("/checkout", { cartItems: payloadItems });

      setLastReceipt(res.data);
      setShowReceipt(true);

      await fetchCart();

      return res.data;
    } catch (err) {
      console.error("checkout error", err);
      setError("Checkout failed");
      throw err;
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
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
