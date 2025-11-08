import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../context/cartContext";

export default function CartItem({ item }) {
  const { removeFromCart, updateCartItem } = useCart();

  const increase = () => {
    updateCartItem(item.id, item.qty + 1);
  };

  const decrease = () => {
    const newQty = item.qty - 1;
    if (newQty <= 0) {
      removeFromCart(item.id);
    } else {
      updateCartItem(item.id, newQty);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="relative flex justify-between items-center 
                 bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-purple-950/40 
                 border border-white/10 backdrop-blur-xl 
                 p-4 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.4)] 
                 hover:shadow-[0_0_25px_rgba(0,255,255,0.25)] 
                 transition-all duration-300"
    >
      <div>
        <p className="font-semibold text-cyan-200 tracking-wide">{item.name}</p>
        <p className="text-sm text-gray-400">Qty: {item.qty}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white/10 rounded-lg px-2 py-1 border border-white/10 shadow-inner">
          <button
            onClick={decrease}
            className="px-2 py-1 rounded-md text-lg font-bold text-cyan-300 
                       hover:bg-cyan-400/20 hover:scale-110 transition"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-3 text-white font-semibold">{item.qty}</span>
          <button
            onClick={increase}
            className="px-2 py-1 rounded-md text-lg font-bold text-purple-300 
                       hover:bg-purple-400/20 hover:scale-110 transition"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <span className="font-semibold text-transparent bg-clip-text 
                         bg-gradient-to-r from-cyan-300 to-purple-400 
                         drop-shadow-sm">
          ₹{item.price * item.qty}
        </span>

        <button
          onClick={() => removeFromCart(item.id)}
          className="flex items-center justify-center text-red-400 hover:text-red-500 
                     hover:scale-110 transition duration-200"
          aria-label="Remove item"
        >
          <X size={18} />
        </button>
      </div>

      {/* Soft Glow Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                from-cyan-400/10 via-transparent to-purple-400/10 
                blur-lg opacity-0 hover:opacity-100 transition 
                pointer-events-none" />

    </motion.div>
  );
}
