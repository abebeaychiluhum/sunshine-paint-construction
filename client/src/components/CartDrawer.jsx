import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const CartDrawer = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();
  const { formatPrice } = useCurrency();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigate("/cart");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-secondary-100 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaShoppingBag className="text-2xl" />
                  <div>
                    <h2 className="text-2xl font-display font-bold">
                      Shopping Cart
                    </h2>
                    <p className="text-sm text-white/80">
                      {cartItems.length} items
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-32 h-32 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                    <FaShoppingBag className="text-5xl text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-secondary-600 mb-6">
                    Add some products to get started!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-white border border-secondary-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.images && item.images[0] ? (
                            <img
                              src={item.images[0].url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaShoppingBag className="text-secondary-400 text-2xl" />
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-secondary-900 mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-secondary-600 mb-2">
                            {item.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-primary-600">
                              {formatPrice(item.price)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity - 1)
                                }
                                className="w-8 h-8 bg-secondary-100 hover:bg-secondary-200 rounded-lg flex items-center justify-center transition-colors"
                              >
                                <FaMinus className="text-xs" />
                              </motion.button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity + 1)
                                }
                                className="w-8 h-8 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center transition-colors"
                              >
                                <FaPlus className="text-xs text-primary-600" />
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-secondary-100 bg-secondary-50">
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-secondary-600 mb-2">
                    <span>Subtotal</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-secondary-600 mb-2">
                    <span>Tax (estimated)</span>
                    <span>{formatPrice(getCartTotal() * 0.15)}</span>
                  </div>
                  <div className="border-t border-secondary-200 pt-2 mt-2">
                    <div className="flex items-center justify-between text-lg font-bold text-secondary-900">
                      <span>Total</span>
                      <span className="text-primary-600">
                        {formatPrice(getCartTotal() * 1.15)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Proceed to Checkout
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewCart}
                    className="w-full py-3 bg-white border-2 border-secondary-300 text-secondary-900 rounded-lg font-semibold hover:bg-secondary-50 transition-colors"
                  >
                    View Full Cart
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
