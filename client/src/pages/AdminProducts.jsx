// src/admin/pages/AdminProducts.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import Badge from "../components/Badge";
import { showNotification } from "../components/Notification";
import API from "../../services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    stock: "",
    category: "",
    sku: "",
    images: [],
    isFeatured: false,
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit,
        ...(search && { search }),
        ...filters,
      });

      const response = await API.get(`/products?${params}`);

      setProducts(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      showNotification("error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle create/update
  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      if (editingId) {
        await API.put(`/products/${editingId}`, formData);
        showNotification("success", "Product updated successfully");
      } else {
        await API.post("/products", formData);
        showNotification("success", "Product created successfully");
      }

      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        comparePrice: "",
        stock: "",
        category: "",
        sku: "",
        images: [],
        isFeatured: false,
        isActive: true,
      });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
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
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        await API.delete(`/products/${product._id}`);
        showNotification("success", "Product deleted successfully");
        fetchProducts();
      } catch (error) {
        showNotification("error", "Failed to delete product");
      }
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
    setShowModal(true);
  };

  // Table columns
  const columns = [
    {
      key: "name",
      label: "Product Name",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      render: (value) => <Badge variant="info">{value}</Badge>,
    },
    {
      key: "price",
      label: "Price",
      render: (value) => `ETB ${value.toLocaleString()}`,
    },
    {
      key: "stock",
      label: "Stock",
      render: (value) => (
        <Badge
          variant={value > 10 ? "success" : value > 0 ? "warning" : "error"}
        >
          {value} units
        </Badge>
      ),
    },
    {
      key: "isFeatured",
      label: "Featured",
      render: (value) => (
        <Badge variant={value ? "success" : "default"}>
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

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Products</h1>
            <p className="text-secondary-600 mt-1">
              Manage your product catalog
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFormData({
                name: "",
                description: "",
                price: "",
                comparePrice: "",
                stock: "",
                category: "",
                sku: "",
                images: [],
                isFeatured: false,
                isActive: true,
              });
              setEditingId(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <FaPlus /> Add Product
          </motion.button>
        </div>

        {/* Search & Filter */}
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          loading={loading}
        />

        {/* Table */}
        <Table
          columns={columns}
          data={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / limit)}
          onPageChange={setPage}
          loading={loading}
        />

        {/* Modal */}
        <Modal
          isOpen={showModal}
          title={editingId ? "Edit Product" : "Add New Product"}
          onClose={() => {
            setShowModal(false);
            setEditingId(null);
          }}
          onSubmit={handleSubmit}
          loading={submitting}
          size="2xl"
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter product description"
                rows="4"
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="0"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {/* Category & SKU */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500"
                >
                  <option value="">Select category</option>
                  <option value="Paint & Coatings">Paint & Coatings</option>
                  <option value="Tiles & Flooring">Tiles & Flooring</option>
                  <option value="Sanitary Ware">Sanitary Ware</option>
                </select>
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
                  placeholder="SKU"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-semibold text-secondary-700">
                  Featured
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-semibold text-secondary-700">
                  Active
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
