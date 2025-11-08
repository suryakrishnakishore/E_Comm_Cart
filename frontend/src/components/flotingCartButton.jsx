import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FloatingCartButton() {
  const { isCartOpen, setIsCartOpen, cartItems } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(!isCartOpen)}
      className="fixed bottom-6 right-6 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition relative"
    >
      <ShoppingCart className="w-6 h-6" />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
          {cartItems.length}
        </span>
      )}
    </button>
  );
}
