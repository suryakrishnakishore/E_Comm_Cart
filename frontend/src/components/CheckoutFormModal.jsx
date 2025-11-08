import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/cartContext";

export default function CheckoutFormModal({ show, onClose }) {
  const { checkout, setShowReceipt } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please fill in both name and email");
      return;
    }

    setLoading(true);
    try {
      await checkout({ name, email }); // backend call
      setShowReceipt(true); // show receipt modal
      onClose(); // close this form
    } catch {
      setError("Checkout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-11/12 max-w-md text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
              Complete Your Checkout 🧾
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none text-gray-800 bg-white/80"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none text-gray-800 bg-white/80"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-600 hover:text-red-500 transition"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
