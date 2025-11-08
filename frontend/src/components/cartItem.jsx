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
      className="flex justify-between items-center bg-white/40 backdrop-blur-md p-3 rounded-xl shadow-sm"
    >
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-600">Qty: {item.qty}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-white/30 rounded-lg p-1">
          <button
            onClick={decrease}
            className="px-2 py-1 rounded-md text-lg font-bold hover:bg-white/40 transition"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-3">{item.qty}</span>
          <button
            onClick={increase}
            className="px-2 py-1 rounded-md text-lg font-bold hover:bg-white/40 transition"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <span className="font-semibold text-emerald-600">₹{item.price * item.qty}</span>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-gray-500 hover:text-red-500 transition ml-2"
          aria-label="Remove item"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
}
