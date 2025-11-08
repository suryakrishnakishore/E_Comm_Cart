import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../context/cartContext";

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex justify-between items-center bg-white/40 backdrop-blur-md p-3 rounded-xl shadow-sm"
    >
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-600">Qty: {item.qty}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-emerald-600">₹{item.price * item.qty}</span>
        <button
          onClick={() => removeFromCart(item.id)} // item.id maps to cartItem._id
          className="text-gray-500 hover:text-red-500 transition"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
}
