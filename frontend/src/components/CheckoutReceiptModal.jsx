import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/cartContext";

export default function CheckoutReceiptModal() {
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
            className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl text-center w-11/12 max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <h2 className="text-2xl font-bold mb-3 text-emerald-600">
              🎉 Order Successful!
            </h2>

            {lastReceipt ? (
              <>
                <div className="text-left space-y-2 text-gray-800">
                  <p><strong>Name:</strong> {lastReceipt.name}</p>
                  <p><strong>Email:</strong> {lastReceipt.email}</p>
                  <p><strong>Order ID:</strong> {lastReceipt.orderId}</p>
                  <p>
                    <strong>Timestamp:</strong>{" "}
                    {new Date(lastReceipt.timestamp).toLocaleString()}
                  </p>
                  <p className="text-lg font-semibold text-emerald-700">
                    Total Paid: ₹{lastReceipt.total}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-600">No receipt found.</p>
            )}

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
