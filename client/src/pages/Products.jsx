import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaTh,
  FaList,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { getProducts, getCategories } from "../services/api";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "createdAt:desc",
  });

  // Pagination
  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get("page")) || 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [filters, pagination.page]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };

      // Remove empty filters
      Object.keys(params).forEach((key) => {
        if (
          params[key] === "" ||
          params[key] === null ||
          params[key] === undefined
        ) {
          delete params[key];
        }
      });

      const response = await getProducts(params);
      setProducts(response.data.products);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total,
        pages: response.data.pages,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "createdAt:desc",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSearchParams({});
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-secondary-900 to-primary-900 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Our Products
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our extensive collection of premium construction materials
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block lg:w-80 flex-shrink-0"
          >
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                categories={categories}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* View Mode & Filter Button */}
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden px-4 py-3 bg-secondary-100 hover:bg-secondary-200 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <FaFilter />
                    <span>Filters</span>
                  </button>

                  {/* Sort Dropdown */}
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange("sort", e.target.value)}
                    className="px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="createdAt:desc">Newest First</option>
                    <option value="price:asc">Price: Low to High</option>
                    <option value="price:desc">Price: High to Low</option>
                    <option value="name:asc">Name: A to Z</option>
                    <option value="name:desc">Name: Z to A</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="hidden md:flex bg-secondary-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "grid"
                          ? "bg-white shadow-md"
                          : "hover:bg-secondary-200"
                      }`}
                    >
                      <FaTh
                        className={
                          viewMode === "grid"
                            ? "text-primary-600"
                            : "text-secondary-600"
                        }
                      />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "list"
                          ? "bg-white shadow-md"
                          : "hover:bg-secondary-200"
                      }`}
                    >
                      <FaList
                        className={
                          viewMode === "list"
                            ? "text-primary-600"
                            : "text-secondary-600"
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(filters.category ||
                filters.minPrice ||
                filters.maxPrice ||
                filters.search) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {filters.search && (
                    <FilterTag
                      label={`Search: ${filters.search}`}
                      onRemove={() => handleFilterChange("search", "")}
                    />
                  )}
                  {filters.category && (
                    <FilterTag
                      label={filters.category}
                      onRemove={() => handleFilterChange("category", "")}
                    />
                  )}
                  {(filters.minPrice || filters.maxPrice) && (
                    <FilterTag
                      label={`Price: ${filters.minPrice || "0"} - ${filters.maxPrice || "∞"}`}
                      onRemove={() => {
                        handleFilterChange("minPrice", "");
                        handleFilterChange("maxPrice", "");
                      }}
                    />
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-semibold"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Results Count */}
              <div className="mt-4 text-sm text-secondary-600">
                Showing{" "}
                <span className="font-semibold text-secondary-900">
                  {products.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-secondary-900">
                  {pagination.total}
                </span>{" "}
                products
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <ProductsLoading />
            ) : products.length === 0 ? (
              <NoProducts onClearFilters={clearFilters} />
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  <AnimatePresence>
                    {products.map((product, index) =>
                      viewMode === "grid" ? (
                        <ProductCard
                          key={product._id}
                          product={product}
                          index={index}
                          formatPrice={formatPrice}
                          onAddToCart={handleAddToCart}
                        />
                      ) : (
                        <ProductListItem
                          key={product._id}
                          product={product}
                          index={index}
                          formatPrice={formatPrice}
                          onAddToCart={handleAddToCart}
                        />
                      ),
                    )}
                  </AnimatePresence>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        categories={categories}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({
  filters,
  categories,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-secondary-900">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-red-600 hover:text-red-700 font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-semibold text-secondary-900 mb-4">Categories</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={filters.category === ""}
              onChange={() => onFilterChange("category", "")}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-secondary-700 group-hover:text-primary-600">
              All Categories
            </span>
          </label>
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === category}
                onChange={() => onFilterChange("category", category)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-secondary-700 group-hover:text-primary-600">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-semibold text-secondary-900 mb-4">Price Range</h4>
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => onFilterChange("minPrice", e.target.value)}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Popular Filters */}
      <div>
        <h4 className="font-semibold text-secondary-900 mb-4">
          Popular Filters
        </h4>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-2 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-sm">
            On Sale
          </button>
          <button className="w-full text-left px-4 py-2 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-sm">
            In Stock
          </button>
          <button className="w-full text-left px-4 py-2 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-sm">
            Featured
          </button>
        </div>
      </div>
    </div>
  );
};

// Product Card Component (Grid View)
const ProductCard = ({ product, index, formatPrice, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/products/${product._id}`}
        className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        {/* Image */}
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

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {product.comparePrice && (
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                SALE
              </span>
            )}
            {product.stock <= 0 && (
              <span className="px-3 py-1 bg-secondary-900 text-white text-sm font-bold rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className={`w-10 h-10 ${isWishlisted ? "bg-red-500" : "bg-white"} rounded-full flex items-center justify-center shadow-lg`}
            >
              <FaHeart
                className={isWishlisted ? "text-white" : "text-secondary-600"}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <FaEye className="text-secondary-600" />
            </motion.button>
          </div>

          {/* Add to Cart Button */}
          {product.stock > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => onAddToCart(product, e)}
              className="absolute bottom-4 left-4 right-4 py-3 bg-primary-600 text-white rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 hover:bg-primary-700"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </motion.button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-sm text-primary-600 font-semibold mb-2">
            {product.category}
          </div>
          <h3 className="text-lg font-bold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(product.rating?.average || 0)
                    ? "text-yellow-400"
                    : "text-secondary-300"
                }
                size={14}
              />
            ))}
            <span className="text-sm text-secondary-600 ml-2">
              ({product.rating?.count || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </div>
              {product.comparePrice && (
                <div className="text-sm text-secondary-400 line-through">
                  {formatPrice(product.comparePrice)}
                </div>
              )}
            </div>
            {product.stock > 0 && product.stock < 10 && (
              <span className="text-xs text-orange-600 font-semibold">
                Only {product.stock} left
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Product List Item Component (List View)
const ProductListItem = ({ product, index, formatPrice, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.03 }}
    >
      <Link
        to={`/products/${product._id}`}
        className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-64 aspect-square md:aspect-auto overflow-hidden bg-secondary-100">
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
            {product.comparePrice && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                SALE
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="text-sm text-primary-600 font-semibold mb-2">
                {product.category}
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-secondary-600 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(product.rating?.average || 0)
                        ? "text-yellow-400"
                        : "text-secondary-300"
                    }
                  />
                ))}
                <span className="text-sm text-secondary-600 ml-2">
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </div>
                {product.comparePrice && (
                  <div className="text-sm text-secondary-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </div>
                )}
              </div>

              {product.stock > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => onAddToCart(product, e)}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Filter Tag Component
const FilterTag = ({ label, onRemove }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold"
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
      >
        <FaTimes size={12} />
      </button>
    </motion.div>
  );
};

// Products Loading Component
const ProductsLoading = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse"
        >
          <div className="aspect-square bg-secondary-200"></div>
          <div className="p-6 space-y-3">
            <div className="h-4 bg-secondary-200 rounded w-1/3"></div>
            <div className="h-6 bg-secondary-200 rounded w-3/4"></div>
            <div className="h-4 bg-secondary-200 rounded w-full"></div>
            <div className="h-8 bg-secondary-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// No Products Component
const NoProducts = ({ onClearFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <div className="w-32 h-32 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FaSearch className="text-6xl text-secondary-400" />
      </div>
      <h3 className="text-2xl font-bold text-secondary-900 mb-4">
        No Products Found
      </h3>
      <p className="text-secondary-600 mb-8 max-w-md mx-auto">
        We couldn't find any products matching your criteria. Try adjusting your
        filters or search terms.
      </p>
      <button
        onClick={onClearFilters}
        className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center space-x-2 mt-12"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-secondary-600">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
              currentPage === page
                ? "bg-primary-600 text-white shadow-lg"
                : "border border-secondary-300 hover:bg-secondary-50"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-secondary-300 rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </motion.div>
  );
};

// Mobile Filter Drawer Component
const MobileFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  categories,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col lg:hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-secondary-100 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold">Filters</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-secondary-900 mb-4 text-lg">
                  Categories
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer group p-3 hover:bg-secondary-50 rounded-lg transition-colors">
                    <input
                      type="radio"
                      name="category-mobile"
                      checked={filters.category === ""}
                      onChange={() => onFilterChange("category", "")}
                      className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-secondary-700 group-hover:text-primary-600 font-medium">
                      All Categories
                    </span>
                  </label>
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-3 cursor-pointer group p-3 hover:bg-secondary-50 rounded-lg transition-colors"
                    >
                      <input
                        type="radio"
                        name="category-mobile"
                        checked={filters.category === category}
                        onChange={() => onFilterChange("category", category)}
                        className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-secondary-700 group-hover:text-primary-600 font-medium">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold text-secondary-900 mb-4 text-lg">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Min Price
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) =>
                        onFilterChange("minPrice", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Max Price
                    </label>
                    <input
                      type="number"
                      placeholder="No limit"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        onFilterChange("maxPrice", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-8">
                <h4 className="font-semibold text-secondary-900 mb-4 text-lg">
                  Sort By
                </h4>
                <select
                  value={filters.sort}
                  onChange={(e) => onFilterChange("sort", e.target.value)}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="createdAt:desc">Newest First</option>
                  <option value="price:asc">Price: Low to High</option>
                  <option value="price:desc">Price: High to Low</option>
                  <option value="name:asc">Name: A to Z</option>
                  <option value="name:desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-secondary-100 bg-secondary-50 space-y-3">
              <button
                onClick={() => {
                  onClearFilters();
                  onClose();
                }}
                className="w-full py-3 bg-white border-2 border-secondary-300 text-secondary-900 rounded-lg font-semibold hover:bg-secondary-50 transition-colors"
              >
                Clear Filters
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Products;
