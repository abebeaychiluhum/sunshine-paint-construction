import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaCreditCard,
  FaMoneyBillWave,
  FaUniversity,
  FaCheckCircle,
  FaShoppingCart,
  FaLock,
  FaTruck,
  FaEdit,
  FaArrowLeft,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Form Data
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Ethiopia",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  // Calculations
  const subtotal = getCartTotal();
  const tax = subtotal * 0.15;
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + tax + shipping;

  const steps = [
    { number: 1, title: "Billing Info", icon: <FaUser /> },
    { number: 2, title: "Shipping", icon: <FaTruck /> },
    { number: 3, title: "Payment", icon: <FaCreditCard /> },
    { number: 4, title: "Review", icon: <FaCheckCircle /> },
  ];

  const handlePlaceOrder = () => {
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // Generate order ID
    const newOrderId = "ORD-" + Date.now().toString().slice(-8);
    setOrderId(newOrderId);
    setOrderPlaced(true);

    // Clear cart
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  if (orderPlaced) {
    return (
      <OrderSuccess orderId={orderId} total={total} formatPrice={formatPrice} />
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
              Checkout
            </h1>
            <p className="text-xl text-gray-300">
              Complete your order securely
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: currentStep >= step.number ? 1 : 0.8 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 transition-all ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg"
                        : "bg-white text-secondary-400 border-2 border-secondary-200"
                    }`}
                  >
                    {step.icon}
                  </motion.div>
                  <span
                    className={`text-sm font-semibold ${
                      currentStep >= step.number
                        ? "text-primary-600"
                        : "text-secondary-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4 bg-secondary-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: currentStep > step.number ? "100%" : "0%",
                      }}
                      className="h-full bg-gradient-to-r from-primary-600 to-primary-500"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Billing Info */}
              {currentStep === 1 && (
                <BillingInfoStep
                  billingInfo={billingInfo}
                  setBillingInfo={setBillingInfo}
                  onNext={() => setCurrentStep(2)}
                />
              )}

              {/* Step 2: Shipping */}
              {currentStep === 2 && (
                <ShippingStep
                  shippingAddress={shippingAddress}
                  setShippingAddress={setShippingAddress}
                  sameAsBilling={sameAsBilling}
                  setSameAsBilling={setSameAsBilling}
                  billingInfo={billingInfo}
                  onNext={() => setCurrentStep(3)}
                  onBack={() => setCurrentStep(1)}
                />
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <PaymentStep
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  paymentDetails={paymentDetails}
                  setPaymentDetails={setPaymentDetails}
                  onNext={() => setCurrentStep(4)}
                  onBack={() => setCurrentStep(2)}
                />
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <ReviewStep
                  billingInfo={billingInfo}
                  shippingAddress={shippingAddress}
                  paymentMethod={paymentMethod}
                  cartItems={cartItems}
                  orderNotes={orderNotes}
                  setOrderNotes={setOrderNotes}
                  agreeToTerms={agreeToTerms}
                  setAgreeToTerms={setAgreeToTerms}
                  formatPrice={formatPrice}
                  onBack={() => setCurrentStep(3)}
                  onPlaceOrder={handlePlaceOrder}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Billing Info Step
const BillingInfoStep = ({ billingInfo, setBillingInfo, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.div
      key="billing"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-secondary-900 mb-6">
        Billing Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">First Name *</label>
            <input
              type="text"
              value={billingInfo.firstName}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, firstName: e.target.value })
              }
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="label-field">Last Name *</label>
            <input
              type="text"
              value={billingInfo.lastName}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, lastName: e.target.value })
              }
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="label-field">Email Address *</label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
            <input
              type="email"
              value={billingInfo.email}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, email: e.target.value })
              }
              className="input-field pl-12"
              required
            />
          </div>
        </div>

        <div>
          <label className="label-field">Phone Number *</label>
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
            <input
              type="tel"
              value={billingInfo.phone}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, phone: e.target.value })
              }
              className="input-field pl-12"
              placeholder="+251 911 234567"
              required
            />
          </div>
        </div>

        <div>
          <label className="label-field">Company (Optional)</label>
          <div className="relative">
            <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
            <input
              type="text"
              value={billingInfo.company}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, company: e.target.value })
              }
              className="input-field pl-12"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Continue to Shipping
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Shipping Step
const ShippingStep = ({
  shippingAddress,
  setShippingAddress,
  sameAsBilling,
  setSameAsBilling,
  billingInfo,
  onNext,
  onBack,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.div
      key="shipping"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-secondary-900 mb-6">
        Shipping Address
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="flex items-center space-x-3 cursor-pointer p-4 bg-secondary-50 rounded-lg">
          <input
            type="checkbox"
            checked={sameAsBilling}
            onChange={(e) => setSameAsBilling(e.target.checked)}
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="font-semibold text-secondary-900">
            Same as billing address
          </span>
        </label>

        {!sameAsBilling && (
          <div className="space-y-6">
            <div>
              <label className="label-field">Street Address *</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-secondary-400" />
                <textarea
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      address: e.target.value,
                    })
                  }
                  className="textarea-field pl-12"
                  rows="3"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-field">City *</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="label-field">State/Region</label>
                <input
                  type="text"
                  value={shippingAddress.state}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      state: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label-field">Zip Code</label>
                <input
                  type="text"
                  value={shippingAddress.zipCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      zipCode: e.target.value,
                    })
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-field">Country *</label>
                <input
                  type="text"
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 px-8 py-4 bg-secondary-100 text-secondary-900 rounded-lg font-bold hover:bg-secondary-200 transition-colors"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Payment Step
const PaymentStep = ({
  paymentMethod,
  setPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  onNext,
  onBack,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    onNext();
  };

  const paymentMethods = [
    {
      id: "cash",
      name: "Cash on Delivery",
      icon: <FaMoneyBillWave />,
      description: "Pay when you receive your order",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <FaUniversity />,
      description: "Transfer directly to our bank account",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <FaCreditCard />,
      description: "Pay securely with your card",
    },
  ];

  return (
    <motion.div
      key="payment"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-secondary-900 mb-6">
        Payment Method
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                paymentMethod === method.id
                  ? "border-primary-600 bg-primary-50"
                  : "border-secondary-200 hover:border-primary-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 text-primary-600 focus:ring-primary-500"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <span className="text-2xl text-primary-600">
                    {method.icon}
                  </span>
                  <span className="font-bold text-secondary-900 text-lg">
                    {method.name}
                  </span>
                </div>
                <p className="text-secondary-600 text-sm">
                  {method.description}
                </p>
              </div>
            </label>
          ))}
        </div>

        {/* Cash on Delivery Info */}
        {paymentMethod === "cash" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-6 bg-blue-50 border border-blue-200 rounded-xl"
          >
            <h4 className="font-bold text-blue-900 mb-2">Cash on Delivery</h4>
            <p className="text-blue-800 text-sm">
              Pay with cash when your order is delivered. Please have the exact
              amount ready.
            </p>
          </motion.div>
        )}

        {/* Bank Transfer Details */}
        {paymentMethod === "bank" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-6 bg-green-50 border border-green-200 rounded-xl space-y-4"
          >
            <h4 className="font-bold text-green-900 mb-3">
              Bank Transfer Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Bank Name:</span>
                <span className="font-semibold text-green-900">
                  Commercial Bank of Ethiopia
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Account Name:</span>
                <span className="font-semibold text-green-900">
                  SunShine Paint Construction Materials
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Account Number:</span>
                <span className="font-semibold text-green-900">
                  1000123456789
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Swift Code:</span>
                <span className="font-semibold text-green-900">CBETETAA</span>
              </div>
            </div>
            <p className="text-green-800 text-sm mt-4 pt-4 border-t border-green-200">
              After completing the transfer, please send the receipt to{" "}
              <a
                href="mailto:payments@sunshinepaint.com"
                className="font-semibold underline"
              >
                payments@sunshinepaint.com
              </a>
            </p>
          </motion.div>
        )}

        {/* Card Payment Form */}
        {paymentMethod === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-6 p-6 bg-purple-50 border border-purple-200 rounded-xl"
          >
            <h4 className="font-bold text-purple-900 mb-4">Card Details</h4>

            <div>
              <label className="label-field">Card Number *</label>
              <input
                type="text"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cardNumber: e.target.value,
                  })
                }
                className="input-field"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required={paymentMethod === "card"}
              />
            </div>

            <div>
              <label className="label-field">Cardholder Name *</label>
              <input
                type="text"
                value={paymentDetails.cardName}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cardName: e.target.value,
                  })
                }
                className="input-field"
                placeholder="John Doe"
                required={paymentMethod === "card"}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Expiry Date *</label>
                <input
                  type="text"
                  value={paymentDetails.expiryDate}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      expiryDate: e.target.value,
                    })
                  }
                  className="input-field"
                  placeholder="MM/YY"
                  maxLength="5"
                  required={paymentMethod === "card"}
                />
              </div>

              <div>
                <label className="label-field">CVV *</label>
                <input
                  type="text"
                  value={paymentDetails.cvv}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cvv: e.target.value,
                    })
                  }
                  className="input-field"
                  placeholder="123"
                  maxLength="3"
                  required={paymentMethod === "card"}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-purple-100 rounded-lg">
              <FaLock className="text-purple-700" />
              <span className="text-sm text-purple-900 font-semibold">
                Your payment information is encrypted and secure
              </span>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 px-8 py-4 bg-secondary-100 text-secondary-900 rounded-lg font-bold hover:bg-secondary-200 transition-colors"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Review Order
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Review Step
const ReviewStep = ({
  billingInfo,
  shippingAddress,
  paymentMethod,
  cartItems,
  orderNotes,
  setOrderNotes,
  agreeToTerms,
  setAgreeToTerms,
  formatPrice,
  onBack,
  onPlaceOrder,
}) => {
  const paymentMethodNames = {
    cash: "Cash on Delivery",
    bank: "Bank Transfer",
    card: "Credit/Debit Card",
  };

  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
    >
      <h2 className="text-3xl font-bold text-secondary-900">
        Review Your Order
      </h2>

      {/* Billing Information */}
      <div className="border-2 border-secondary-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-secondary-900">
            Billing Information
          </h3>
          <button
            onClick={() => onBack()}
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center space-x-1"
          >
            <FaEdit />
            <span>Edit</span>
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-secondary-600">Name:</span>
            <p className="font-semibold text-secondary-900">
              {billingInfo.firstName} {billingInfo.lastName}
            </p>
          </div>
          <div>
            <span className="text-secondary-600">Email:</span>
            <p className="font-semibold text-secondary-900">
              {billingInfo.email}
            </p>
          </div>
          <div>
            <span className="text-secondary-600">Phone:</span>
            <p className="font-semibold text-secondary-900">
              {billingInfo.phone}
            </p>
          </div>
          {billingInfo.company && (
            <div>
              <span className="text-secondary-600">Company:</span>
              <p className="font-semibold text-secondary-900">
                {billingInfo.company}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="border-2 border-secondary-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-secondary-900 mb-4">
          Shipping Address
        </h3>
        <div className="text-sm">
          <p className="font-semibold text-secondary-900">
            {shippingAddress.address || "Same as billing address"}
          </p>
          {shippingAddress.city && (
            <p className="text-secondary-600">
              {shippingAddress.city}, {shippingAddress.state}{" "}
              {shippingAddress.zipCode}
            </p>
          )}
          <p className="text-secondary-600">{shippingAddress.country}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="border-2 border-secondary-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-secondary-900 mb-4">
          Payment Method
        </h3>
        <p className="font-semibold text-secondary-900">
          {paymentMethodNames[paymentMethod] || "Not selected"}
        </p>
      </div>

      {/* Order Items */}
      <div className="border-2 border-secondary-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-secondary-900 mb-4">
          Order Items ({cartItems.length})
        </h3>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-3 border-b border-secondary-100 last:border-0"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.images && item.images[0] ? (
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaShoppingCart className="text-secondary-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-secondary-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-secondary-600">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="font-bold text-primary-600">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <p className="text-xs text-secondary-600">
                  {formatPrice(item.price)} each
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Notes */}
      <div>
        <label className="label-field">Order Notes (Optional)</label>
        <textarea
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          className="textarea-field"
          rows="4"
          placeholder="Any special instructions for your order..."
        />
      </div>

      {/* Terms and Conditions */}
      <div className="border-2 border-secondary-200 rounded-xl p-6">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 mt-1"
          />
          <span className="text-secondary-700">
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-primary-600 hover:underline font-semibold"
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-primary-600 hover:underline font-semibold"
            >
              Privacy Policy
            </Link>
            . I understand that my order will be processed and shipped according
            to the selected delivery method.
          </span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 px-8 py-4 bg-secondary-100 text-secondary-900 rounded-lg font-bold hover:bg-secondary-200 transition-colors"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={!agreeToTerms}
          className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaCheckCircle />
          <span>Place Order</span>
        </button>
      </div>
    </motion.div>
  );
};

// Order Summary Sidebar
const OrderSummary = ({
  cartItems,
  subtotal,
  tax,
  shipping,
  total,
  formatPrice,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
      <h3 className="text-2xl font-bold text-secondary-900">Order Summary</h3>

      {/* Items Preview */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center space-x-3 text-sm">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
              {item.images && item.images[0] ? (
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaShoppingCart className="text-secondary-400 text-xs" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-secondary-900 truncate">
                {item.name}
              </p>
              <p className="text-xs text-secondary-600">Qty: {item.quantity}</p>
            </div>
            <span className="font-semibold text-secondary-900">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-secondary-200 pt-6 space-y-3">
        <div className="flex justify-between text-secondary-700">
          <span>Subtotal</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-secondary-700">
          <span>Tax (15%)</span>
          <span className="font-semibold">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-secondary-700">
          <span>Shipping</span>
          <span className="font-semibold">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        <div className="border-t border-secondary-200 pt-3">
          <div className="flex justify-between text-xl">
            <span className="font-bold text-secondary-900">Total</span>
            <span className="font-bold text-primary-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
        <FaLock className="text-green-600" />
        <span className="text-sm text-green-700 font-semibold">
          Secure Checkout
        </span>
      </div>
    </div>
  );
};

// Order Success Component
const OrderSuccess = ({ orderId, total, formatPrice }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 flex items-center justify-center py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <FaCheckCircle className="text-7xl text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-5xl font-bold text-secondary-900 mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-xl text-secondary-600 mb-8">
                Thank you for your order. We've received your order and will
                process it shortly.
              </p>

              <div className="bg-gradient-to-r from-primary-50 to-orange-50 rounded-xl p-8 mb-8">
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <p className="text-sm text-secondary-600 mb-1">
                      Order Number
                    </p>
                    <p className="text-2xl font-bold text-primary-600">
                      {orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600 mb-1">
                      Total Amount
                    </p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {formatPrice(total)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg text-left">
                  <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">
                      Order Confirmation Email Sent
                    </p>
                    <p className="text-sm text-blue-700">
                      Check your inbox for order details and tracking
                      information
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg text-left">
                  <FaTruck className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">
                      Estimated Delivery
                    </p>
                    <p className="text-sm text-green-700">
                      Your order will be delivered within 3-5 business days
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/portal"
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold hover:shadow-xl transition-all"
                >
                  View Order Status
                </Link>
                <Link
                  to="/products"
                  className="px-8 py-4 bg-secondary-100 text-secondary-900 rounded-lg font-bold hover:bg-secondary-200 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-secondary-200">
                <p className="text-secondary-600">
                  Need help?{" "}
                  <Link
                    to="/contact"
                    className="text-primary-600 hover:underline font-semibold"
                  >
                    Contact our support team
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
