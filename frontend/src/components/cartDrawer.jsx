import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    total,
    checkout,
    loadingCart,
  } = useCart();

  const handleCheckout = async () => {
    try {
      await checkout();
      setIsCartOpen(false);
    } catch (err) {
      console.error("Checkout error", err);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30"
            onClick={() => setIsCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed top-0 right-0 w-80 h-full bg-white/30 backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-between rounded-l-3xl z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <h2 className="text-xl font-semibold mb-4">Your Cart 🛒</h2>

            <div className="flex-1 overflow-y-auto space-y-4">
              {loadingCart ? (
                <p className="text-gray-600 text-center mt-10">Loading...</p>
              ) : cartItems.length === 0 ? (
                <p className="text-gray-600 text-center mt-10">Your cart is empty</p>
              ) : (
                cartItems.map((item) => <CartItem key={item.id} item={item} />)
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-white/40 pt-4 mt-4">
                <p className="text-lg font-semibold">Total: ₹{total}</p>
                <button
                  onClick={handleCheckout}
                  className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:scale-105 transition"
                >
                  Checkout →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
