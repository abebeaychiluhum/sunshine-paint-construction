import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaFileInvoice,
  FaCheckCircle,
  FaPlus,
  FaTimes,
  FaCalendar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClipboardList,
} from "react-icons/fa";
import { PRODUCT_CATEGORIES } from "../utils/constants";
import { createQuote } from "../services/api";

const Quote = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [quoteData, setQuoteData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    timeline: "",
    message: "",
    budgetMin: "",
    budgetMax: "",
    location: "",
  });

  const [products, setProducts] = useState([
    { productName: "", quantity: "", unit: "piece", notes: "" },
  ]);

  const steps = [
    { number: 1, title: "Your Information", icon: <FaUser /> },
    { number: 2, title: "Project Details", icon: <FaBuilding /> },
    { number: 3, title: "Product List", icon: <FaClipboardList /> },
    { number: 4, title: "Review & Submit", icon: <FaCheckCircle /> },
  ];

  const projectTypes = [
    "Residential",
    "Commercial",
    "Industrial",
    "Renovation",
    "New Construction",
    "Interior Design",
    "Other",
  ];

  const timelines = [
    "Urgent (1-2 weeks)",
    "1 Month",
    "2-3 Months",
    "3+ Months",
    "Flexible",
  ];

  const units = ["piece", "box", "sqm", "liter", "kg", "meter", "set"];

  const addProduct = () => {
    setProducts([
      ...products,
      { productName: "", quantity: "", unit: "piece", notes: "" },
    ]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const quoteRequest = {
        ...quoteData,
        products: products.filter((p) => p.productName && p.quantity),
        budget: {
          min: parseFloat(quoteData.budgetMin) || 0,
          max: parseFloat(quoteData.budgetMax) || 0,
          currency: "ETB",
        },
      };

      await createQuote(quoteRequest);
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit quote. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <QuoteSuccess />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-900 to-primary-900 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Request a <span className="text-primary-400">Quote</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Get a customized quote for your construction project. Fill out the
              form below and our team will get back to you within 24 hours.
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
                    className={`text-sm font-semibold text-center ${
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

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {/* Form Steps */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1PersonalInfo
                quoteData={quoteData}
                setQuoteData={setQuoteData}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <Step2ProjectDetails
                quoteData={quoteData}
                setQuoteData={setQuoteData}
                projectTypes={projectTypes}
                timelines={timelines}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <Step3ProductList
                products={products}
                updateProduct={updateProduct}
                addProduct={addProduct}
                removeProduct={removeProduct}
                categories={PRODUCT_CATEGORIES}
                units={units}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <Step4Review
                quoteData={quoteData}
                products={products}
                loading={loading}
                onSubmit={handleSubmit}
                onBack={() => setCurrentStep(3)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Step 1: Personal Information
const Step1PersonalInfo = ({ quoteData, setQuoteData, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-secondary-900 mb-6">
        Your Information
      </h2>
      <p className="text-secondary-600 mb-8">
        Let's start with your contact details so we can send you the quote.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">Full Name *</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                value={quoteData.name}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, name: e.target.value })
                }
                className="input-field pl-12"
                placeholder="John Doe"
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
                value={quoteData.email}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, email: e.target.value })
                }
                className="input-field pl-12"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">Phone Number *</label>
            <div className="relative">
              <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="tel"
                value={quoteData.phone}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, phone: e.target.value })
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
                value={quoteData.company}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, company: e.target.value })
                }
                className="input-field pl-12"
                placeholder="ABC Construction"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Continue to Project Details
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Step 2: Project Details
const Step2ProjectDetails = ({
  quoteData,
  setQuoteData,
  projectTypes,
  timelines,
  onNext,
  onBack,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-secondary-900 mb-6">
        Project Details
      </h2>
      <p className="text-secondary-600 mb-8">
        Tell us more about your construction project.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label-field">Project Type *</label>
          <select
            value={quoteData.projectType}
            onChange={(e) =>
              setQuoteData({ ...quoteData, projectType: e.target.value })
            }
            className="input-field"
            required
          >
            <option value="">Select project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-field">Project Location *</label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
            <input
              type="text"
              value={quoteData.location}
              onChange={(e) =>
                setQuoteData({ ...quoteData, location: e.target.value })
              }
              className="input-field pl-12"
              placeholder="Addis Ababa, Bole"
              required
            />
          </div>
        </div>

        <div>
          <label className="label-field">Timeline *</label>
          <div className="relative">
            <FaCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
            <select
              value={quoteData.timeline}
              onChange={(e) =>
                setQuoteData({ ...quoteData, timeline: e.target.value })
              }
              className="input-field pl-12"
              required
            >
              <option value="">Select timeline</option>
              {timelines.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label-field">Budget Min (ETB)</label>
            <div className="relative">
              <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="number"
                value={quoteData.budgetMin}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, budgetMin: e.target.value })
                }
                className="input-field pl-12"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="label-field">Budget Max (ETB)</label>
            <div className="relative">
              <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="number"
                value={quoteData.budgetMax}
                onChange={(e) =>
                  setQuoteData({ ...quoteData, budgetMax: e.target.value })
                }
                className="input-field pl-12"
                placeholder="100000"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="label-field">Project Description *</label>
          <textarea
            value={quoteData.message}
            onChange={(e) =>
              setQuoteData({ ...quoteData, message: e.target.value })
            }
            className="textarea-field"
            rows="5"
            placeholder="Describe your project requirements..."
            required
          />
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-4 bg-secondary-100 text-secondary-900 rounded-lg font-bold hover:bg-secondary-200 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Continue to Products
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Step 3: Product List
const Step3ProductList = ({
  products,
  updateProduct,
  addProduct,
  removeProduct,
  categories,
  units,
  onNext,
  onBack,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if at least one product is filled
    const hasValidProduct = products.some((p) => p.productName && p.quantity);
    if (!hasValidProduct) {
      alert("Please add at least one product with name and quantity");
      return;
    }

    onNext();
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-secondary-900 mb-6">
        Product List
      </h2>
      <p className="text-secondary-600 mb-8">
        List all the materials and products you need for your project.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border-2 border-secondary-200 rounded-xl hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-secondary-900">
                  Product {index + 1}
                </h4>
                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="label-field">Product/Material Name *</label>
                  <input
                    type="text"
                    value={product.productName}
                    onChange={(e) =>
                      updateProduct(index, "productName", e.target.value)
                    }
                    className="input-field"
                    placeholder="e.g., Premium White Paint, Ceramic Tiles"
                    required={index === 0}
                  />
                </div>

                <div>
                  <label className="label-field">Quantity *</label>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      updateProduct(index, "quantity", e.target.value)
                    }
                    className="input-field"
                    placeholder="100"
                    min="1"
                    required={index === 0}
                  />
                </div>

                <div>
                  <label className="label-field">Unit *</label>
                  <select
                    value={product.unit}
                    onChange={(e) =>
                      updateProduct(index, "unit", e.target.value)
                    }
                    className="input-field"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="label-field">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={product.notes}
                    onChange={(e) =>
                      updateProduct(index, "notes", e.target.value)
                    }
                    className="textarea-field"
                    rows="2"
                    placeholder="Color, brand preference, specifications..."
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          type="button"
          onClick={addProduct}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-100 text-primary-700 rounded-lg font-semibold hover:bg-primary-200 transition-colors"
        >
          <FaPlus />
          <span>Add Another Product</span>
        </button>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-4 bg-secondary-100 text-secondary-900 rounded-lg font-bold hover:bg-secondary-200 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Review Quote Request
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Step 4: Review & Submit
const Step4Review = ({ quoteData, products, loading, onSubmit, onBack }) => {
  const validProducts = products.filter((p) => p.productName && p.quantity);

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-secondary-900 mb-6">
        Review Your Quote Request
      </h2>
      <p className="text-secondary-600 mb-8">
        Please review all the information before submitting your quote request.
      </p>

      <div className="space-y-6">
        {/* Personal Information */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
          <h3 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
            <FaUser className="mr-3 text-blue-600" />
            Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-secondary-600">Name:</span>
              <p className="font-semibold text-secondary-900">
                {quoteData.name}
              </p>
            </div>
            <div>
              <span className="text-secondary-600">Email:</span>
              <p className="font-semibold text-secondary-900">
                {quoteData.email}
              </p>
            </div>
            <div>
              <span className="text-secondary-600">Phone:</span>
              <p className="font-semibold text-secondary-900">
                {quoteData.phone}
              </p>
            </div>
            {quoteData.company && (
              <div>
                <span className="text-secondary-600">Company:</span>
                <p className="font-semibold text-secondary-900">
                  {quoteData.company}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
          <h3 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
            <FaBuilding className="mr-3 text-green-600" />
            Project Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-secondary-600">Project Type:</span>
              <p className="font-semibold text-secondary-900">
                {quoteData.projectType}
              </p>
            </div>
            <div>
              <span className="text-secondary-600">Location:</span>
              <p className="font-semibold text-secondary-900">
                {quoteData.location}
              </p>
            </div>
            <div>
              <span className="text-secondary-600">Timeline:</span>
              <p className="font-semibold text-secondary-900">
                {quoteData.timeline}
              </p>
            </div>
            {(quoteData.budgetMin || quoteData.budgetMax) && (
              <div>
                <span className="text-secondary-600">Budget Range:</span>
                <p className="font-semibold text-secondary-900">
                  Br {quoteData.budgetMin || "0"} - Br{" "}
                  {quoteData.budgetMax || "No limit"}
                </p>
              </div>
            )}
          </div>
          {quoteData.message && (
            <div className="mt-4">
              <span className="text-secondary-600">Description:</span>
              <p className="font-semibold text-secondary-900 mt-2">
                {quoteData.message}
              </p>
            </div>
          )}
        </div>

        {/* Products List */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
          <h3 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
            <FaClipboardList className="mr-3 text-purple-600" />
            Requested Products ({validProducts.length})
          </h3>
          <div className="space-y-3">
            {validProducts.map((product, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border-2 border-purple-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-secondary-900">
                    {product.productName}
                  </h4>
                  <span className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-sm font-semibold">
                    {product.quantity} {product.unit}
                  </span>
                </div>
                {product.notes && (
                  <p className="text-sm text-secondary-600 mt-2">
                    <span className="font-semibold">Notes:</span>{" "}
                    {product.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl">
          <h4 className="font-bold text-yellow-900 mb-2 flex items-center">
            <FaFileInvoice className="mr-2" />
            What Happens Next?
          </h4>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li className="flex items-start">
              <FaCheckCircle className="mr-2 mt-1 flex-shrink-0 text-yellow-600" />
              <span>Our team will review your request within 24 hours</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="mr-2 mt-1 flex-shrink-0 text-yellow-600" />
              <span>
                We'll prepare a detailed quote with pricing and availability
              </span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="mr-2 mt-1 flex-shrink-0 text-yellow-600" />
              <span>
                You'll receive the quote via email and can discuss any
                modifications
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="px-8 py-4 bg-secondary-100 text-secondary-900 rounded-lg font-bold hover:bg-secondary-200 transition-colors disabled:opacity-50"
        >
          Back to Edit
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-bold hover:shadow-xl transition-all disabled:opacity-50 flex items-center space-x-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <FaCheckCircle />
              <span>Submit Quote Request</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

// Quote Success Component
const QuoteSuccess = () => {
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
                Quote Request Submitted!
              </h1>
              <p className="text-xl text-secondary-600 mb-8">
                Thank you for your quote request. Our team will review it and
                get back to you within 24 hours with a detailed quotation.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                  What's Next?
                </h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary-900 mb-1">
                        Email Confirmation
                      </h4>
                      <p className="text-secondary-600 text-sm">
                        Check your email for a confirmation of your quote
                        request
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary-900 mb-1">
                        Quote Preparation
                      </h4>
                      <p className="text-secondary-600 text-sm">
                        Our experts will prepare a detailed quote with pricing
                        and product availability
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary-900 mb-1">
                        Quote Delivery
                      </h4>
                      <p className="text-secondary-600 text-sm">
                        You'll receive the detailed quote via email within 24
                        hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary-900 mb-1">
                        Discussion & Finalization
                      </h4>
                      <p className="text-secondary-600 text-sm">
                        Our team will contact you to discuss and finalize the
                        details
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a
                  href="/"
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold hover:shadow-xl transition-all"
                >
                  Back to Home
                </a>
                <a
                  href="/products"
                  className="px-8 py-4 bg-secondary-100 text-secondary-900 rounded-lg font-bold hover:bg-secondary-200 transition-colors"
                >
                  Browse Products
                </a>
                <a
                  href="/portal"
                  className="px-8 py-4 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors"
                >
                  View in Portal
                </a>
              </div>

              <div className="pt-8 border-t border-secondary-200">
                <p className="text-secondary-600 mb-4">
                  Need immediate assistance?
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="tel:+251911234567"
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    <FaPhone />
                    <span>Call Us</span>
                  </a>
                  <span className="text-secondary-400">|</span>
                  <a
                    href="https://wa.me/251911234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold"
                  >
                    <span>WhatsApp</span>
                  </a>
                  <span className="text-secondary-400">|</span>
                  <a
                    href="/contact"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <FaEnvelope />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Quote;
