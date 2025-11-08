// src/components/CartDrawer.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CheckoutFormModal from "./CheckoutFormModal";
import CheckoutReceiptModal from "./CheckoutReceiptModal";
import { useCart } from "../context/cartContext";
import CartItem from "./cartItem";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, total, loadingCart } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-gradient-to-br from-black/40 via-purple-800/20 to-cyan-700/30 backdrop-blur-2xl"
              onClick={() => setIsCartOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white/10 backdrop-blur-2xl border-l border-white/30 shadow-[0_0_50px_rgba(0,255,255,0.2)] flex flex-col justify-between rounded-l-[2rem] z-50 overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              {/* Glowing header */}
              <div className="relative p-6 border-b border-white/20">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                  Your Cosmic Cart 🛒
                </h2>
                <div className="absolute -top-10 right-10 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto space-y-4 p-6">
                {loadingCart ? (
                  <p className="text-cyan-100 text-center">Loading cart...</p>
                ) : cartItems.length === 0 ? (
                  <p className="text-cyan-100 text-center">Your cart is empty 🌌</p>
                ) : (
                  cartItems.map((item) => <CartItem key={item.id} item={item} />)
                )}
              </div>

              {/* Total & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/20">
                  <div className="text-lg font-semibold text-white/90 mb-3">
                    Total: <span className="text-cyan-400">₹{total}</span>
                  </div>
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-semibold tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:scale-105 transition"
                  >
                    Proceed to Checkout 🚀
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutFormModal
        show={showCheckoutForm}
        onClose={() => setShowCheckoutForm(false)}
      />
      <CheckoutReceiptModal />
    </>
  );
}
