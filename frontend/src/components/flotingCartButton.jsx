import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";

export default function FloatingCartButton() {
  const { setIsCartOpen, cartItems } = useCart();

  const totalQty = cartItems.reduce((sum, i) => sum + (i.qty || 0), 0);

  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (totalQty > 0) {
      setBurst(true);
      const timer = setTimeout(() => setBurst(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalQty]);

  return (
    <motion.div
      className="fixed top-6 left-6 z-50 flex items-center justify-center"
      initial={{ y: -80, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 150 }}
    >
      <motion.button
        onClick={() => setIsCartOpen(true)}
        whileHover={{ scale: 1.12, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 
                   shadow-[0_0_30px_rgba(0,255,255,0.3)] flex items-center justify-center cursor-pointer border border-white/20 
                   backdrop-blur-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all duration-300"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        <ShoppingCart
          size={26}
          className="text-white relative z-10 drop-shadow-md"
        />

        <AnimatePresence>
          {totalQty > 0 && (
            <motion.div
              key={totalQty}
              initial={{ scale: 0, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full 
                         bg-gradient-to-r from-purple-500 to-cyan-400 text-xs font-bold 
                         flex items-center justify-center text-white shadow-lg border border-white/20 z-20"
            >
              {totalQty}
            </motion.div>
          )}
        </AnimatePresence>

        <span className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/10 text-xs text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">
          View Cart
        </span>
      </motion.button>

      <AnimatePresence>
        {burst && (
          <>
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * 360;
              const distance = 30 + Math.random() * 20;
              const x = Math.cos((angle * Math.PI) / 180) * distance;
              const y = Math.sin((angle * Math.PI) / 180) * distance;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x, y, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
