// src/admin/pages/AdminProducts.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
} from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import Badge from "../components/Badge";
import { showNotification } from "../components/Notification";
import API from "../../services/api";

const AdminProducts = () => {
  // State Management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    stock: "",
    category: "",
    subCategory: "",
    sku: "",
    unit: "piece",
    brand: "",
    isFeatured: false,
    isActive: true,
    tags: [],
    specifications: {},
  });
  const [formErrors, setFormErrors] = useState({});

  // Get auth header
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  // Categories list for dropdown
  const categories = [
    "Paint & Coatings",
    "Tiles & Flooring",
    "Sanitary Ware",
    "Marble & Granite",
    "Lighting",
    "Steel Products",
    "Construction Tools",
    "Interior Products",
    "Adhesives & Sealants",
    "Doors & Windows",
  ];

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit,
        ...(search && { search }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(statusFilter && {
          status: statusFilter === "active" ? "true" : "false",
        }),
      });

      const response = await API.get(`/products?${params}`, getAuthHeader());

      setProducts(response.data.products || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      showNotification("error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, categoryFilter, statusFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!formData.price) {
      errors.price = "Price is required";
    } else if (formData.price < 0) {
      errors.price = "Price cannot be negative";
    }

    if (!formData.stock && formData.stock !== 0) {
      errors.stock = "Stock is required";
    } else if (formData.stock < 0) {
      errors.stock = "Stock cannot be negative";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle create/update
  const handleSubmit = async () => {
    if (!validateForm()) {
      showNotification("error", "Please fix the errors in the form");
      return;
    }

    try {
      setSubmitting(true);

      // Prepare data
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        comparePrice: formData.comparePrice
          ? parseFloat(formData.comparePrice)
          : undefined,
        stock: parseInt(formData.stock),
      };

      if (editingId) {
        await API.put(`/products/${editingId}`, submitData, getAuthHeader());
        showNotification("success", "Product updated successfully");
      } else {
        await API.post("/products", submitData, getAuthHeader());
        showNotification("success", "Product created successfully");
      }

      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      showNotification(
        "error",
        error.response?.data?.message || "Failed to save product",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (product) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      await API.delete(`/products/${product._id}`, getAuthHeader());
      showNotification("success", "Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("error", "Failed to delete product");
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      comparePrice: product.comparePrice || "",
      stock: product.stock || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
      sku: product.sku || "",
      unit: product.unit || "piece",
      brand: product.brand || "",
      isFeatured: product.isFeatured || false,
      isActive: product.isActive !== false,
      tags: product.tags || [],
      specifications: product.specifications || {},
    });
    setEditingId(product._id);
    setShowModal(true);
    setFormErrors({});
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      comparePrice: "",
      stock: "",
      category: "",
      subCategory: "",
      sku: "",
      unit: "piece",
      brand: "",
      isFeatured: false,
      isActive: true,
      tags: [],
      specifications: {},
    });
    setFormErrors({});
    setEditingId(null);
  };

  // Handle open add product modal
  const handleOpenAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  // Table columns
  const columns = [
    {
      key: "name",
      label: "Product Name",
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-semibold text-secondary-900">{value}</p>
          <p className="text-xs text-secondary-500">{row.sku}</p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value) => <Badge variant="info">{value}</Badge>,
    },
    {
      key: "price",
      label: "Price",
      render: (value) => (
        <span className="font-semibold text-secondary-900">
          ETB {parseFloat(value).toLocaleString()}
        </span>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      render: (value) => {
        let variant = "success";
        if (value <= 0) variant = "error";
        else if (value <= 10) variant = "warning";

        return (
          <Badge variant={variant}>
            {value} {value === 1 ? "unit" : "units"}
          </Badge>
        );
      },
    },
    {
      key: "isFeatured",
      label: "Featured",
      render: (value) => (
        <Badge variant={value ? "success" : "default"}>
          {value ? <FaCheck className="inline mr-1" /> : ""}
          {value ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (value) => (
        <Badge variant={value ? "success" : "error"}>
          {value ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Products</h1>
            <p className="text-secondary-600 mt-1">
              Manage your product catalog ({total} total)
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <FaPlus /> Add Product
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        {!loading && (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4"
          >
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-primary-600">{total}</p>
              <p className="text-sm text-secondary-600">Total Products</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-green-600">
                {products.filter((p) => p.isActive).length}
              </p>
              <p className="text-sm text-secondary-600">Active</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-amber-600">
                {products.filter((p) => p.stock <= 10 && p.stock > 0).length}
              </p>
              <p className="text-sm text-secondary-600">Low Stock</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-primary-600">
                {products.filter((p) => p.isFeatured).length}
              </p>
              <p className="text-sm text-secondary-600">Featured</p>
            </div>
          </motion.div>
        )}

        {/* Search & Filter */}
        <motion.div variants={itemVariants}>
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            filters={{
              category: {
                label: "Filter by Category",
                value: categoryFilter,
                options: categories.map((cat) => ({
                  value: cat,
                  label: cat,
                })),
              },
              status: {
                label: "Filter by Status",
                value: statusFilter,
                options: [
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ],
              },
            }}
            onFilterChange={(key, value) => {
              if (key === "category") setCategoryFilter(value);
              if (key === "status") setStatusFilter(value);
              setPage(1); // Reset to first page when filtering
            }}
            loading={loading}
          />
        </motion.div>

        {/* Table */}
        <motion.div variants={itemVariants}>
          <Table
            columns={columns}
            data={products}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={(key, order) => {
              setSortBy(key);
              setSortOrder(order);
            }}
          />
        </motion.div>

        {/* Pagination */}
        <motion.div variants={itemVariants}>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / limit)}
            onPageChange={setPage}
            loading={loading}
          />
        </motion.div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={showModal}
          title={editingId ? "Edit Product" : "Add New Product"}
          onClose={() => {
            setShowModal(false);
            resetForm();
          }}
          onSubmit={handleSubmit}
          loading={submitting}
          size="2xl"
        >
          <div className="space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter product name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 transition-colors ${
                  formErrors.name ? "border-red-500" : "border-secondary-300"
                }`}
              />
              {formErrors.name && (
                <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter product description"
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 transition-colors resize-none ${
                  formErrors.description
                    ? "border-red-500"
                    : "border-secondary-300"
                }`}
              />
              {formErrors.description && (
                <p className="text-xs text-red-600 mt-1">
                  {formErrors.description}
                </p>
              )}
            </div>

            {/* Price & Compare Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Price (ETB) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 transition-colors ${
                    formErrors.price ? "border-red-500" : "border-secondary-300"
                  }`}
                />
                {formErrors.price && (
                  <p className="text-xs text-red-600 mt-1">
                    {formErrors.price}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Compare Price (ETB)
                </label>
                <input
                  type="number"
                  value={formData.comparePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, comparePrice: e.target.value })
                  }
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Stock & Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 transition-colors ${
                    formErrors.stock ? "border-red-500" : "border-secondary-300"
                  }`}
                />
                {formErrors.stock && (
                  <p className="text-xs text-red-600 mt-1">
                    {formErrors.stock}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Unit
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                >
                  <option value="piece">Piece</option>
                  <option value="box">Box</option>
                  <option value="sqm">Square Meter (sqm)</option>
                  <option value="liter">Liter</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="meter">Meter</option>
                </select>
              </div>
            </div>

            {/* Category & SKU */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 transition-colors ${
                    formErrors.category
                      ? "border-red-500"
                      : "border-secondary-300"
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {formErrors.category && (
                  <p className="text-xs text-red-600 mt-1">
                    {formErrors.category}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  placeholder="Unique SKU"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Brand & SubCategory */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  placeholder="Product brand"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Sub Category
                </label>
                <input
                  type="text"
                  value={formData.subCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, subCategory: e.target.value })
                  }
                  placeholder="Sub category"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="border-t border-secondary-200 pt-4 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-primary-600"
                />
                <span className="text-sm font-semibold text-secondary-700">
                  Active Product
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-primary-600"
                />
                <span className="text-sm font-semibold text-secondary-700">
                  Featured Product
                </span>
              </label>
            </div>
          </div>
        </Modal>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminProducts;
