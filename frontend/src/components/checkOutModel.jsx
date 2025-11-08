import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/cartContext.jsx";

export default function CheckoutModal() {
  const { showReceipt, setShowReceipt, total } = useCart();

  return (
    <AnimatePresence>
      {showReceipt && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/50 backdrop-blur-lg p-8 rounded-3xl shadow-xl text-center"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <h2 className="text-2xl font-bold mb-4">🎉 Checkout Successful!</h2>
            <p className="text-lg">Total Paid: <span className="font-semibold text-emerald-600">₹{total}</span></p>
            <p className="text-sm text-gray-600 mt-2">
              {new Date().toLocaleString()}
            </p>
            <button
              onClick={() => setShowReceipt(false)}
              className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:scale-105 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
