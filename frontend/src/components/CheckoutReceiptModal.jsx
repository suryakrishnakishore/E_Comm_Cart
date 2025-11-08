// src/components/CheckoutReceiptModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useCart } from "../context/cartContext";

export default function CheckoutReceiptModal() {
  const { showReceipt, setShowReceipt, lastReceipt } = useCart();

  return (
    <AnimatePresence>
      {showReceipt && (
        <>
          <Confetti recycle={false} numberOfPieces={300} />
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xl z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative p-10 w-11/12 max-w-md rounded-3xl bg-gradient-to-br from-emerald-400/10 via-cyan-400/20 to-blue-500/10 border border-white/20 shadow-[0_0_60px_rgba(0,255,255,0.3)] text-center text-white overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 60 }}
            >
              <div className="absolute -bottom-10 right-10 w-40 h-40 bg-emerald-400/30 blur-[100px] rounded-full" />
              <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                🌌 Transaction Complete
              </h2>
              <p className="text-gray-300 mb-6">
                Your order has been successfully placed!
              </p>

              {lastReceipt && (
                <div className="space-y-2 text-left bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-md">
                  <p><span className="font-semibold">Name:</span> {lastReceipt.name}</p>
                  <p><span className="font-semibold">Email:</span> {lastReceipt.email}</p>
                  <p><span className="font-semibold">Order ID:</span> {lastReceipt.orderId}</p>
                  <p>
                    <span className="font-semibold">Timestamp:</span>{" "}
                    {new Date(lastReceipt.timestamp).toLocaleString()}
                  </p>
                  <p className="text-lg font-semibold text-cyan-300">
                    Total Paid: ₹{lastReceipt.total}
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowReceipt(false)}
                className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:scale-105 transition shadow-lg"
              >
                Close Portal ✨
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
