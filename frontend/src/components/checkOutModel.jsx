import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CheckoutModal() {
  const { showReceipt, setShowReceipt, lastReceipt } = useCart();

  if (!showReceipt) return null;

  return (
    <AnimatePresence>
      {showReceipt && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <h2 className="text-2xl font-bold mb-3 text-emerald-600">
              🎉 Checkout Successful!
            </h2>

            {lastReceipt ? (
              <>
                <p className="text-gray-700 text-lg mb-2">
                  Total Paid:{" "}
                  <span className="font-semibold text-emerald-700">
                    ₹{lastReceipt.total}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Transaction Time:{" "}
                  {new Date(lastReceipt.timestamp).toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-gray-600 mb-4">Receipt not available.</p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-gray-500">
                Your receipt has been generated successfully.
              </p>
            </motion.div>

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
