import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import client from "../api/client";
import { useCart } from "../context/cartContext";
import FloatingCartButton from "../components/flotingCartButton";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await client.get("/products");
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setProducts(data);
      } catch (err) {
        console.error("fetchProducts error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-cyan-300 text-2xl">
        Loading your showroom...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-12 bg-gradient-to-br from-black via-gray-900 to-[#010b1f] text-white">
     
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-purple-600/30 blur-[140px] rounded-full animate-pulse" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl sm:text-6xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
      >
        Welcome to E-Comm
      </motion.h1>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 0 40px rgba(0,255,255,0.3)",
            }}
            className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:border-cyan-400/50 transition"
          >
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-md opacity-0 hover:opacity-100 transition pointer-events-none" />

            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full aspect-square bg-gradient-to-br from-gray-700/40 to-gray-900/40 rounded-2xl flex items-center justify-center"
              >
                <span className="text-5xl">{p.emoji ?? "🛍️"}</span>
              </motion.div>
            </div>

            <div className="z-10 mt-6 text-center">
              <h3 className="text-xl font-semibold mb-1 text-cyan-300">{p.name}</h3>
              <p className="text-gray-400 mb-3 text-sm">
                {p.description ?? "A premium futuristic product."}
              </p>
              <p className="text-lg font-semibold text-purple-300">₹{p.price}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(p)}
              className="mt-5 py-2 w-full rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:scale-[1.02] transition"
            >
              Add to Cart
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
