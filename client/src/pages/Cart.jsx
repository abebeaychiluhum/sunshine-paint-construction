import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaTag,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCart();
  const { formatPrice } = useCurrency();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.15; // 15% tax
  const shipping = subtotal > 5000 ? 0 : 200; // Free shipping over 5000 ETB
  const discount = appliedCoupon
    ? subtotal * (appliedCoupon.discount / 100)
    : 0;
  const total = subtotal + tax + shipping - discount;

  const handleApplyCoupon = () => {
    // Simulate coupon validation
    const validCoupons = {
      SAVE10: { code: "SAVE10", discount: 10 },
      SAVE20: { code: "SAVE20", discount: 20 },
      WELCOME: { code: "WELCOME", discount: 15 },
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon(validCoupons[couponCode.toUpperCase()]);
      setCouponCode("");
    } else {
      alert("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <div className="w-32 h-32 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShoppingCart className="text-6xl text-secondary-400" />
              </div>
              <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-xl text-secondary-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <FaShoppingCart />
                <span>Start Shopping</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-900 to-primary-900 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Shopping Cart
            </h1>
            <p className="text-xl text-gray-300">
              {getCartCount()} {getCartCount() === 1 ? "item" : "items"} in your
              cart
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary-900">
                  Cart Items ({cartItems.length})
                </h2>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  <FaTrash />
                  <span>Clear Cart</span>
                </button>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex flex-col md:flex-row gap-4 p-4 border-2 border-secondary-200 rounded-xl hover:border-primary-300 transition-colors"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/products/${item._id}`}
                        className="w-full md:w-32 h-32 flex-shrink-0 bg-secondary-100 rounded-lg overflow-hidden"
                      >
                        {item.images && item.images[0] ? (
                          <img
                            src={item.images[0].url}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaShoppingCart className="text-4xl text-secondary-400" />
                          </div>
                        )}
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${item._id}`} className="block">
                          <h3 className="font-bold text-lg text-secondary-900 mb-1 hover:text-primary-600 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm text-secondary-600 mb-2">
                            {item.category}
                          </p>
                        </Link>

                        <div className="flex flex-wrap items-center gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              }
                              className="w-8 h-8 bg-secondary-100 hover:bg-secondary-200 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="w-12 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.stock}
                              className="w-8 h-8 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FaPlus className="text-xs text-primary-600" />
                            </button>
                          </div>

                          {/* Stock Info */}
                          {item.stock < 10 && (
                            <span className="text-xs text-orange-600 font-semibold">
                              Only {item.stock} left!
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-secondary-600">
                            {formatPrice(item.price)} each
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              <FaArrowLeft />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold text-secondary-900">
                Order Summary
              </h2>

              {/* Coupon Code */}
              <div>
                <label className="label-field">Coupon Code</label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-100 border border-green-400 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-600" />
                      <span className="font-semibold text-green-700">
                        {appliedCoupon.code} Applied
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-green-700 hover:text-green-800"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      placeholder="Enter code"
                      className="flex-1 input-field"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                )}
                <p className="text-xs text-secondary-500 mt-1">
                  Try: SAVE10, SAVE20, WELCOME
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-6 border-t border-secondary-200">
                <div className="flex items-center justify-between text-secondary-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-secondary-700">
                  <span>Tax (15%)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>

                <div className="flex items-center justify-between text-secondary-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-green-600">
                    <span className="flex items-center space-x-1">
                      <FaTag />
                      <span>Discount ({appliedCoupon.discount}%)</span>
                    </span>
                    <span className="font-semibold">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}

                {shipping > 0 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Add{" "}
                      <span className="font-bold">
                        {formatPrice(5000 - subtotal)}
                      </span>{" "}
                      more for FREE shipping!
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-secondary-200">
                  <div className="flex items-center justify-between text-xl">
                    <span className="font-bold text-secondary-900">Total</span>
                    <span className="font-bold text-primary-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight />
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-secondary-200">
                <div className="text-center">
                  <FaTruck className="text-3xl text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-secondary-700">
                    Fast Delivery
                  </p>
                </div>
                <div className="text-center">
                  <FaShieldAlt className="text-3xl text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-secondary-700">
                    Secure Payment
                  </p>
                </div>
                <div className="text-center">
                  <FaUndo className="text-3xl text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-secondary-700">
                    Easy Returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrash className="text-4xl text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                  Clear Cart?
                </h3>
                <p className="text-secondary-600 mb-8">
                  Are you sure you want to remove all items from your cart? This
                  action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-6 py-3 bg-secondary-100 text-secondary-900 rounded-lg font-semibold hover:bg-secondary-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearCart}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
