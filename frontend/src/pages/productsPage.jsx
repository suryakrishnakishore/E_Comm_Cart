import { useEffect, useState } from "react";
import client from "../api/client.js";
import { useCart } from "../context/cartContext.jsx";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await client.get("/products");
        console.log("res: ", res);
        
        setProducts(res.data.products

          
        );
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="p-8">Loading products...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
      {products.map((p) => (
        <div
          key={p._id ?? p.id}
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
