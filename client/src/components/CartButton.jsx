import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const CartButton = () => {
  const { setIsCartOpen, getCartCount } = useCart();
  const cartCount = getCartCount();

  if (cartCount === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-40 right-8 z-40 lg:hidden p-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full shadow-2xl"
      aria-label="Open cart"
    >
      <FaShoppingCart className="w-6 h-6" />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
      >
        {cartCount}
      </motion.span>
    </motion.button>
  );
};

export default CartButton;
