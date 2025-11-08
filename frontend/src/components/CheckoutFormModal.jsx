// src/components/CheckoutFormModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/cartContext";

export default function CheckoutFormModal({ show, onClose }) {
  const { checkout } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return setError("Fill in all fields");
    setLoading(true);
    try {
      await checkout({ name, email });
      onClose();
    } catch {
      setError("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xl z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative p-10 w-11/12 max-w-md rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-purple-500/20 border border-white/20 shadow-[0_0_40px_rgba(0,255,255,0.3)] text-center overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 70 }}
          >
            <div className="absolute -top-20 left-20 w-48 h-48 bg-cyan-400/30 blur-[100px] rounded-full" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg mb-6">
              Complete Your Journey
            </h2>
            <p className="text-gray-300 text-sm mb-6">
              Enter your details to finalize your cosmic purchase ✨
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-300 outline-none transition"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-300 outline-none transition"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-semibold hover:scale-105 shadow-lg transition disabled:opacity-60"
              >
                {loading ? "Processing..." : "Submit Order 🚀"}
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-300 hover:text-red-400 transition"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
