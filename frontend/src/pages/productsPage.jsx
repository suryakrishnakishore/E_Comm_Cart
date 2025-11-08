import { useCart } from "../context/CartContext";

const mockProducts = [
  { id: 1, name: "Wireless Mouse", price: 599 },
  { id: 2, name: "Keyboard", price: 899 },
  { id: 3, name: "Headphones", price: 1299 },
  { id: 4, name: "Laptop Stand", price: 999 },
  { id: 5, name: "USB Cable", price: 199 },
];

export default function ProductsPage() {
  const { addToCart } = useCart();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
      {mockProducts.map((p) => (
        <div
          key={p.id}
          className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-md p-6 text-center hover:scale-105 transition"
        >
          <div className="text-xl font-semibold">{p.name}</div>
          <div className="text-gray-600 mt-2">₹{p.price}</div>
          <button
            onClick={() => addToCart(p)}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-white hover:scale-105 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
