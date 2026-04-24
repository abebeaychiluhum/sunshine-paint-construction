import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaShareAlt,
  FaMinus,
  FaPlus,
  FaCheck,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLink,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import { getProduct } from "../services/api";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getProduct(id);
      setProduct(response.data.product);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === "increment" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name}`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform], "_blank");
    }
    setShowShareModal(false);
  };

  if (loading) {
    return <ProductDetailLoading />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const discount = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) / product.comparePrice) * 100,
      )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-secondary-200">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-secondary-600 hover:text-primary-600">
              Home
            </Link>
            <span className="text-secondary-400">/</span>
            <Link
              to="/products"
              className="text-secondary-600 hover:text-primary-600"
            >
              Products
            </Link>
            <span className="text-secondary-400">/</span>
            <Link
              to={`/products?category=${product.category}`}
              className="text-secondary-600 hover:text-primary-600"
            >
              {product.category}
            </Link>
            <span className="text-secondary-400">/</span>
            <span className="text-secondary-900 font-semibold truncate">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <ImageGallery
              images={product.images || []}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
              onImageClick={() => setShowImageModal(true)}
              productName={product.name}
              discount={discount}
              comparePrice={product.comparePrice}
            />
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Category & Brand */}
              <div className="flex items-center space-x-4 mb-4">
                <Link
                  to={`/products?category=${product.category}`}
                  className="px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold hover:bg-primary-200 transition-colors"
                >
                  {product.category}
                </Link>
                {product.brand && (
                  <span className="text-secondary-600 text-sm">
                    Brand:{" "}
                    <span className="font-semibold">{product.brand}</span>
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-4">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(product.rating?.average || 0)
                          ? "text-yellow-400"
                          : "text-secondary-300"
                      }
                      size={20}
                    />
                  ))}
                </div>
                <span className="text-secondary-600">
                  {product.rating?.average?.toFixed(1) || "0.0"} (
                  {product.rating?.count || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="text-4xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </div>
                  {product.comparePrice && (
                    <>
                      <div className="text-2xl text-secondary-400 line-through">
                        {formatPrice(product.comparePrice)}
                      </div>
                      <div className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                        Save {discount}%
                      </div>
                    </>
                  )}
                </div>
                <p className="text-secondary-600 text-sm">
                  Price per {product.unit || "piece"} • Tax included
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-semibold">
                      In Stock ({product.stock} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <p className="text-secondary-700 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-secondary-700 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border-2 border-secondary-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange("decrement")}
                        disabled={quantity <= 1}
                        className="p-3 hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-16 text-center font-semibold focus:outline-none"
                      />
                      <button
                        onClick={() => handleQuantityChange("increment")}
                        disabled={quantity >= product.stock}
                        className="p-3 hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <span className="text-secondary-600 text-sm">
                      {product.stock < 10 && `Only ${product.stock} left!`}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 min-w-[200px] py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 border-2 ${
                    isWishlisted
                      ? "bg-red-500 border-red-500 text-white"
                      : "border-secondary-300 text-secondary-600 hover:border-red-500 hover:text-red-500"
                  } rounded-lg transition-all duration-300`}
                >
                  <FaHeart size={24} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowShareModal(true)}
                  className="p-4 border-2 border-secondary-300 text-secondary-600 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-all duration-300"
                >
                  <FaShareAlt size={24} />
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <FaTruck className="text-3xl text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-secondary-900">
                    Free Delivery
                  </p>
                  <p className="text-xs text-secondary-600">
                    Orders over 5000 Br
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <FaShieldAlt className="text-3xl text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-secondary-900">
                    Warranty
                  </p>
                  <p className="text-xs text-secondary-600">
                    Quality Guaranteed
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <FaUndo className="text-3xl text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-secondary-900">
                    Easy Returns
                  </p>
                  <p className="text-xs text-secondary-600">7 Days Return</p>
                </div>
              </div>

              {/* SKU & Tags */}
              <div className="border-t border-secondary-200 pt-6">
                {product.sku && (
                  <div className="mb-3">
                    <span className="text-secondary-600">SKU: </span>
                    <span className="text-secondary-900 font-semibold">
                      {product.sku}
                    </span>
                  </div>
                )}
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <span className="text-secondary-600 mb-2 block">
                      Tags:{" "}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Link
                          key={index}
                          to={`/products?search=${tag}`}
                          className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs Section */}
        <ProductTabs
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Related Products */}
        <RelatedProducts
          category={product.category}
          currentProductId={product._id}
        />
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleShare}
        productName={product.name}
      />

      {/* Image Modal */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        images={product.images || []}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
        productName={product.name}
      />
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({
  images,
  selectedImage,
  onSelectImage,
  onImageClick,
  productName,
  discount,
  comparePrice,
}) => {
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-secondary-100 rounded-2xl flex items-center justify-center">
        <FaShoppingCart className="text-8xl text-secondary-400" />
      </div>
    );
  }

  return (
    <div className="sticky top-24">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xl mb-4 cursor-zoom-in group"
        onClick={onImageClick}
      >
        <img
          src={images[selectedImage]?.url}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        {comparePrice && discount > 0 && (
          <div className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-full font-bold text-lg shadow-lg">
            -{discount}%
          </div>
        )}

        {/* Zoom Hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-lg">
            <p className="text-sm font-semibold text-secondary-900">
              Click to zoom
            </p>
          </div>
        </div>
      </motion.div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectImage(index)}
              className={`aspect-square rounded-lg overflow-hidden ${
                selectedImage === index
                  ? "ring-4 ring-primary-600 shadow-lg"
                  : "ring-2 ring-secondary-200 hover:ring-primary-400"
              } transition-all`}
            >
              <img
                src={image.url}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

// Product Tabs Component
const ProductTabs = ({ product, activeTab, setActiveTab }) => {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
      {/* Tab Headers */}
      <div className="border-b border-secondary-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 font-semibold text-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "text-primary-600 border-b-4 border-primary-600 bg-primary-50"
                  : "text-secondary-600 hover:text-primary-600 hover:bg-secondary-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                Product Description
              </h3>
              <div className="prose max-w-none text-secondary-700 leading-relaxed">
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  This premium {product.category.toLowerCase()} product is
                  carefully selected to meet the highest quality standards.
                  Imported from trusted manufacturers, it ensures durability and
                  excellent performance for your construction needs.
                </p>
                <p>
                  Perfect for both residential and commercial projects, this
                  product combines quality, reliability, and value. Our expert
                  team is available to provide professional consultation for
                  your specific requirements.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "specifications" && (
            <motion.div
              key="specifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Technical Specifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {product.specifications &&
                Object.keys(product.specifications).length > 0 ? (
                  Object.entries(product.specifications).map(
                    ([key, value], index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                      >
                        <span className="font-semibold text-secondary-700">
                          {key}
                        </span>
                        <span className="text-secondary-900">{value}</span>
                      </div>
                    ),
                  )
                ) : (
                  <div className="col-span-2 text-center py-8 text-secondary-600">
                    <p>Detailed specifications coming soon</p>
                  </div>
                )}

                {/* Additional Info */}
                <div className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                  <span className="font-semibold text-secondary-700">
                    Brand
                  </span>
                  <span className="text-secondary-900">
                    {product.brand || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                  <span className="font-semibold text-secondary-700">
                    Category
                  </span>
                  <span className="text-secondary-900">{product.category}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                  <span className="font-semibold text-secondary-700">Unit</span>
                  <span className="text-secondary-900">
                    {product.unit || "piece"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                  <span className="font-semibold text-secondary-700">
                    Stock Status
                  </span>
                  <span
                    className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Key Features
              </h3>
              {product.features && product.features.length > 0 ? (
                <ul className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-4 bg-gradient-to-r from-primary-50 to-transparent rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-0.5">
                        <FaCheck className="text-white text-xs" />
                      </div>
                      <span className="text-secondary-700 leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="text-4xl text-secondary-400" />
                  </div>
                  <p className="text-secondary-600">
                    Feature details will be updated soon
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewsSection product={product} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Reviews Section Component
const ReviewsSection = ({ product }) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    name: "",
    comment: "",
  });

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Ahmed Mohammed",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Excellent quality! Exactly what I needed for my construction project. Highly recommend!",
      verified: true,
    },
    {
      id: 2,
      name: "Sara Teklu",
      rating: 4,
      date: "2024-01-10",
      comment: "Great product, fast delivery. Will definitely order again.",
      verified: true,
    },
    {
      id: 3,
      name: "Daniel Assefa",
      rating: 5,
      date: "2024-01-05",
      comment:
        "Top quality material. The customer service was also very helpful.",
      verified: false,
    },
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("New review:", newReview);
    // Here you would send to API
    alert("Thank you for your review!");
    setNewReview({ rating: 5, name: "", comment: "" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-secondary-900">
          Customer Reviews
        </h3>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">
              {product.rating?.average?.toFixed(1) || "0.0"}
            </div>
            <div className="flex items-center justify-center space-x-1 my-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.rating?.average || 0)
                      ? "text-yellow-400"
                      : "text-secondary-300"
                  }
                  size={16}
                />
              ))}
            </div>
            <p className="text-sm text-secondary-600">
              {product.rating?.count || 0} reviews
            </p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 mb-12">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 bg-secondary-50 rounded-xl hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-secondary-900">
                      {review.name}
                    </h4>
                    {review.verified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-secondary-300"
                          }
                          size={14}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-secondary-600">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-secondary-700 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Write Review Form */}
      <div className="border-t border-secondary-200 pt-8">
        <h4 className="text-xl font-bold text-secondary-900 mb-6">
          Write a Review
        </h4>
        <form onSubmit={handleSubmitReview} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-secondary-700 mb-2">
              Your Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none"
                >
                  <FaStar
                    className={
                      star <= newReview.rating
                        ? "text-yellow-400 hover:text-yellow-500"
                        : "text-secondary-300 hover:text-secondary-400"
                    }
                    size={32}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="label-field">Your Name</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              className="input-field"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="label-field">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="textarea-field"
              rows="4"
              placeholder="Share your experience with this product..."
              required
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

// Share Modal Component
const ShareModal = ({ isOpen, onClose, onShare, productName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 p-8 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-secondary-900">
                Share Product
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <FaTimes className="text-secondary-600" />
              </button>
            </div>

            <p className="text-secondary-600 mb-6">
              Share "{productName}" with your friends
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onShare("facebook")}
                className="flex items-center justify-center space-x-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaFacebookF size={20} />
                <span className="font-semibold">Facebook</span>
              </button>

              <button
                onClick={() => onShare("twitter")}
                className="flex items-center justify-center space-x-3 p-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                <FaTwitter size={20} />
                <span className="font-semibold">Twitter</span>
              </button>

              <button
                onClick={() => onShare("whatsapp")}
                className="flex items-center justify-center space-x-3 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp size={20} />
                <span className="font-semibold">WhatsApp</span>
              </button>

              <button
                onClick={() => onShare("copy")}
                className="flex items-center justify-center space-x-3 p-4 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
              >
                <FaLink size={20} />
                <span className="font-semibold">Copy Link</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Image Modal Component
const ImageModal = ({
  isOpen,
  onClose,
  images,
  selectedImage,
  onSelectImage,
  productName,
}) => {
  const handlePrevious = () => {
    onSelectImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1);
  };

  const handleNext = () => {
    onSelectImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0);
  };

  return (
    <AnimatePresence>
      {isOpen && images.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors z-10"
              >
                <FaTimes size={24} />
              </button>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors"
                  >
                    <FaChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors"
                  >
                    <FaChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="bg-white rounded-2xl overflow-hidden">
                <img
                  src={images[selectedImage]?.url}
                  alt={`${productName} - Image ${selectedImage + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>

              {/* Image Counter */}
              <div className="text-center mt-4">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold">
                  {selectedImage + 1} / {images.length}
                </span>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => onSelectImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                        selectedImage === index
                          ? "ring-4 ring-primary-500"
                          : "ring-2 ring-white/30 hover:ring-white/60"
                      } transition-all`}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Related Products Component
const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchRelatedProducts();
  }, [category, currentProductId]);

  const fetchRelatedProducts = async () => {
    try {
      const response = await getProducts({ category, limit: 4 });
      const filtered = response.data.products.filter(
        (p) => p._id !== currentProductId,
      );
      setRelatedProducts(filtered.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching related products:", error);
      setLoading(false);
    }
  };

  if (loading || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-4">
          Related <span className="text-gradient">Products</span>
        </h2>
        <p className="text-xl text-secondary-600">
          You might also be interested in these products
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/products/${product._id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary-100">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaShoppingCart className="text-6xl text-secondary-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <div className="text-xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Loading Component
const ProductDetailLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
          <div>
            <div className="aspect-square bg-secondary-200 rounded-2xl mb-4"></div>
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-secondary-200 rounded-lg"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-8 bg-secondary-200 rounded w-3/4"></div>
            <div className="h-12 bg-secondary-200 rounded w-1/2"></div>
            <div className="h-20 bg-secondary-200 rounded"></div>
            <div className="h-16 bg-secondary-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Not Found Component
const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 bg-secondary-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaShoppingCart className="text-6xl text-secondary-400" />
        </div>
        <h2 className="text-3xl font-bold text-secondary-900 mb-4">
          Product Not Found
        </h2>
        <p className="text-secondary-600 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Browse All Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
