// src/admin/pages/AdminQuotes.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaClock,
  FaUser,
  FaStickyNote,
  FaFileInvoice,
  FaCalendar,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import Badge from "../components/Badge";
import { showNotification } from "../components/Notification";
import API from "../../services/api";

const AdminQuotes = () => {
  // State Management
  const [quotes, setQuotes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Modal State
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [noteErrors, setNoteErrors] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  // Get auth header
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  // Fetch quotes
  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
      });

      const response = await API.get(`/quotes?${params}`, getAuthHeader());

      setQuotes(response.data.quotes || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
      showNotification("error", "Failed to load quotes");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter, priorityFilter]);

  // Fetch users for assignment
  const fetchUsers = useCallback(async () => {
    try {
      const response = await API.get("/users?limit=100", getAuthHeader());
      setUsers(response.data.data?.filter((u) => u.role === "admin") || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
    fetchUsers();
  }, [fetchQuotes, fetchUsers]);

  // Handle view quote
  const handleViewQuote = async (quote) => {
    try {
      const response = await API.get(`/quotes/${quote._id}`, getAuthHeader());
      setSelectedQuote(response.data.quote);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Error viewing quote:", error);
      showNotification("error", "Failed to load quote details");
    }
  };

  // Handle add note
  const handleAddNote = async () => {
    // Validation
    if (!noteText.trim()) {
      setNoteErrors({ note: "Note cannot be empty" });
      return;
    }

    if (noteText.trim().length < 5) {
      setNoteErrors({ note: "Note must be at least 5 characters" });
      return;
    }

    try {
      setSubmitting(true);

      await API.post(
        `/quotes/${selectedQuote._id}/notes`,
        { content: noteText },
        getAuthHeader(),
      );

      showNotification("success", "Note added successfully");
      setNoteText("");
      setNoteErrors({});
      setShowNoteModal(false);

      // Refresh quote details
      const response = await API.get(
        `/quotes/${selectedQuote._id}`,
        getAuthHeader(),
      );
      setSelectedQuote(response.data.quote);
      fetchQuotes();
    } catch (error) {
      console.error("Error adding note:", error);
      showNotification("error", "Failed to add note");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle assign quote
  const handleAssignQuote = async () => {
    if (!selectedUser) {
      showNotification("error", "Please select a user");
      return;
    }

    try {
      setSubmitting(true);

      await API.put(
        `/quotes/${selectedQuote._id}/assign`,
        { assignedTo: selectedUser },
        getAuthHeader(),
      );

      showNotification("success", "Quote assigned successfully");
      setSelectedUser("");
      setShowAssignModal(false);

      // Refresh quote details
      const response = await API.get(
        `/quotes/${selectedQuote._id}`,
        getAuthHeader(),
      );
      setSelectedQuote(response.data.quote);
      fetchQuotes();
    } catch (error) {
      console.error("Error assigning quote:", error);
      showNotification("error", "Failed to assign quote");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle update status
  const handleUpdateStatus = async () => {
    if (!selectedStatus) {
      showNotification("error", "Please select a status");
      return;
    }

    try {
      setSubmitting(true);

      await API.patch(
        `/quotes/${selectedQuote._id}/status`,
        { status: selectedStatus },
        getAuthHeader(),
      );

      showNotification("success", "Quote status updated successfully");
      setSelectedStatus("");
      setShowStatusModal(false);

      // Refresh quote details
      const response = await API.get(
        `/quotes/${selectedQuote._id}`,
        getAuthHeader(),
      );
      setSelectedQuote(response.data.quote);
      fetchQuotes();
    } catch (error) {
      console.error("Error updating status:", error);
      showNotification("error", "Failed to update status");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (quote) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the quote from ${quote.name}?`,
      )
    ) {
      return;
    }

    try {
      await API.delete(`/quotes/${quote._id}`, getAuthHeader());
      showNotification("success", "Quote deleted successfully");
      if (showDetailModal) {
        setShowDetailModal(false);
      }
      fetchQuotes();
    } catch (error) {
      console.error("Error deleting quote:", error);
      showNotification("error", "Failed to delete quote");
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "reviewing":
        return "info";
      case "quoted":
        return "primary";
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "default";
    }
  };

  // Table columns
  const columns = [
    {
      key: "name",
      label: "Customer",
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-semibold text-secondary-900">{value}</p>
          <p className="text-xs text-secondary-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: "company",
      label: "Company",
      render: (value) => (
        <p className="text-sm text-secondary-700">{value || "N/A"}</p>
      ),
    },
    {
      key: "projectType",
      label: "Project Type",
      render: (value) => (
        <Badge variant="info" className="text-xs">
          {value}
        </Badge>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (value) => (
        <Badge variant={getPriorityColor(value)} className="text-xs">
          {value}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge variant={getStatusColor(value)} className="text-xs">
          {value}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (value) => (
        <span className="text-xs text-secondary-600">
          {new Date(value).toLocaleDateString()}
        </span>
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
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-secondary-900">
            Quote Requests
          </h1>
          <p className="text-secondary-600 mt-1">
            Manage customer quote requests ({total} total)
          </p>
        </motion.div>

        {/* Stats Cards */}
        {!loading && (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-5 gap-4"
          >
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-secondary-900">{total}</p>
              <p className="text-sm text-secondary-600">Total Quotes</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-amber-600">
                {quotes.filter((q) => q.status === "pending").length}
              </p>
              <p className="text-sm text-secondary-600">Pending</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-blue-600">
                {quotes.filter((q) => q.status === "reviewing").length}
              </p>
              <p className="text-sm text-secondary-600">Reviewing</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-purple-600">
                {quotes.filter((q) => q.status === "quoted").length}
              </p>
              <p className="text-sm text-secondary-600">Quoted</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-green-600">
                {quotes.filter((q) => q.status === "accepted").length}
              </p>
              <p className="text-sm text-secondary-600">Accepted</p>
            </div>
          </motion.div>
        )}

        {/* Search & Filter */}
        <motion.div variants={itemVariants}>
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            filters={{
              status: {
                label: "Filter by Status",
                value: statusFilter,
                options: [
                  { value: "pending", label: "Pending" },
                  { value: "reviewing", label: "Reviewing" },
                  { value: "quoted", label: "Quoted" },
                  { value: "accepted", label: "Accepted" },
                  { value: "rejected", label: "Rejected" },
                  { value: "completed", label: "Completed" },
                ],
              },
              priority: {
                label: "Filter by Priority",
                value: priorityFilter,
                options: [
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                  { value: "urgent", label: "Urgent" },
                ],
              },
            }}
            onFilterChange={(key, value) => {
              if (key === "status") setStatusFilter(value);
              if (key === "priority") setPriorityFilter(value);
              setPage(1);
            }}
            loading={loading}
          />
        </motion.div>

        {/* Table */}
        <motion.div variants={itemVariants}>
          <Table
            columns={columns}
            data={quotes}
            loading={loading}
            onView={handleViewQuote}
            onDelete={handleDelete}
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

        {/* Detail Modal */}
        <Modal
          isOpen={showDetailModal}
          title="Quote Request Details"
          onClose={() => {
            setShowDetailModal(false);
            setSelectedQuote(null);
          }}
          size="2xl"
          showFooter={false}
        >
          {selectedQuote && (
            <div className="space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Customer Info */}
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 rounded-lg border border-secondary-200">
                <h3 className="text-lg font-bold text-secondary-900 mb-4">
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                      Name
                    </p>
                    <p className="text-lg font-semibold text-secondary-900 mt-1">
                      {selectedQuote.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                      Email
                    </p>
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="text-lg font-semibold text-primary-600 hover:text-primary-700 mt-1"
                    >
                      {selectedQuote.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                      Phone
                    </p>
                    <a
                      href={`tel:${selectedQuote.phone}`}
                      className="text-lg font-semibold text-primary-600 hover:text-primary-700 mt-1"
                    >
                      {selectedQuote.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                      Company
                    </p>
                    <p className="text-lg font-semibold text-secondary-900 mt-1">
                      {selectedQuote.company || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4">
                  Project Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      Project Type
                    </p>
                    <Badge variant="info" className="mt-1">
                      {selectedQuote.projectType}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      Timeline
                    </p>
                    <p className="text-sm font-semibold text-blue-900 mt-1">
                      {selectedQuote.timeline || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      Budget (Min)
                    </p>
                    <p className="text-sm font-semibold text-blue-900 mt-1">
                      ETB {selectedQuote.budget?.min?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      Budget (Max)
                    </p>
                    <p className="text-sm font-semibold text-blue-900 mt-1">
                      ETB {selectedQuote.budget?.max?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Message */}
              <div>
                <p className="text-sm font-semibold text-secondary-600 uppercase tracking-wide mb-3">
                  Project Details / Message
                </p>
                <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-200">
                  <p className="text-secondary-800 whitespace-pre-wrap leading-relaxed">
                    {selectedQuote.message}
                  </p>
                </div>
              </div>

              {/* Products Requested */}
              {selectedQuote.products && selectedQuote.products.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-secondary-600 uppercase tracking-wide mb-3">
                    Products Requested
                  </p>
                  <div className="space-y-2">
                    {selectedQuote.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-secondary-50 p-3 rounded-lg border border-secondary-200"
                      >
                        <p className="font-semibold text-secondary-900">
                          {product.productName}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Qty: {product.quantity} {product.unit || "units"}
                          {product.notes && ` - ${product.notes}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status & Priority */}
              <div className="grid grid-cols-3 gap-4 border-t border-secondary-200 pt-4">
                <div>
                  <p className="text-xs font-semibold text-secondary-600">
                    Status
                  </p>
                  <Badge
                    variant={getStatusColor(selectedQuote.status)}
                    className="mt-1"
                  >
                    {selectedQuote.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-semibold text-secondary-600">
                    Priority
                  </p>
                  <Badge
                    variant={getPriorityColor(selectedQuote.priority)}
                    className="mt-1"
                  >
                    {selectedQuote.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-semibold text-secondary-600">
                    Date
                  </p>
                  <p className="text-sm text-secondary-700 mt-1">
                    {new Date(selectedQuote.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Assigned To */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-2">
                  Assigned To
                </p>
                {selectedQuote.assignedTo ? (
                  <p className="text-lg font-semibold text-purple-900">
                    {selectedQuote.assignedTo.name}
                  </p>
                ) : (
                  <p className="text-sm text-purple-700">Not assigned</p>
                )}
              </div>

              {/* Notes Section */}
              {selectedQuote.notes && selectedQuote.notes.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-secondary-600 uppercase tracking-wide mb-3">
                    Internal Notes ({selectedQuote.notes.length})
                  </p>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedQuote.notes.map((note, idx) => (
                      <div
                        key={idx}
                        className="bg-yellow-50 p-3 rounded-lg border border-yellow-200"
                      >
                        <p className="text-sm text-yellow-900">
                          {note.content}
                        </p>
                        <p className="text-xs text-yellow-700 mt-2">
                          By: {note.createdBy?.name || "Admin"} •{" "}
                          {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quoted Price */}
              {selectedQuote.quotedPrice && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                    Quoted Price
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    ETB{" "}
                    {selectedQuote.quotedPrice.amount?.toLocaleString() || "0"}
                  </p>
                  {selectedQuote.quotedPrice.validUntil && (
                    <p className="text-xs text-green-700 mt-2">
                      Valid until:{" "}
                      {new Date(
                        selectedQuote.quotedPrice.validUntil,
                      ).toLocaleDateString()}
                    </p>
                  )}
                  {selectedQuote.quotedPrice.notes && (
                    <p className="text-sm text-green-800 mt-2">
                      {selectedQuote.quotedPrice.notes}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="border-t border-secondary-200 pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowStatusModal(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                  >
                    <FaClock className="text-sm" /> Change Status
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedUser(selectedQuote.assignedTo?._id || "");
                      setShowAssignModal(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
                  >
                    <FaUser className="text-sm" /> Assign To
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowNoteModal(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-200 transition-colors"
                  >
                    <FaStickyNote className="text-sm" /> Add Note
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDelete(selectedQuote)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                  >
                    <FaTrash className="text-sm" /> Delete
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDetailModal(false)}
                  className="w-full px-4 py-2 bg-secondary-200 text-secondary-700 rounded-lg font-semibold hover:bg-secondary-300 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </div>
          )}
        </Modal>

        {/* Status Modal */}
        <Modal
          isOpen={showStatusModal}
          title="Update Quote Status"
          onClose={() => {
            setShowStatusModal(false);
            setSelectedStatus("");
          }}
          onSubmit={handleUpdateStatus}
          loading={submitting}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Select New Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="">Choose status...</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="quoted">Quoted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {selectedStatus === "quoted" && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  When quoting, you can add quoted price information in the
                  quote details.
                </p>
              </div>
            )}
          </div>
        </Modal>

        {/* Assign Modal */}
        <Modal
          isOpen={showAssignModal}
          title="Assign Quote to Team Member"
          onClose={() => {
            setShowAssignModal(false);
            setSelectedUser("");
          }}
          onSubmit={handleAssignQuote}
          loading={submitting}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Select Admin User
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="">Choose admin...</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal>

        {/* Note Modal */}
        <Modal
          isOpen={showNoteModal}
          title="Add Internal Note"
          onClose={() => {
            setShowNoteModal(false);
            setNoteText("");
            setNoteErrors({});
          }}
          onSubmit={handleAddNote}
          loading={submitting}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                Note
              </label>
              <textarea
                value={noteText}
                onChange={(e) => {
                  setNoteText(e.target.value);
                  setNoteErrors({});
                }}
                placeholder="Add internal note..."
                rows="5"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 transition-colors resize-none ${
                  noteErrors.note ? "border-red-500" : "border-secondary-300"
                }`}
              />
              {noteErrors.note && (
                <p className="text-xs text-red-600 mt-1">{noteErrors.note}</p>
              )}
            </div>
          </div>
        </Modal>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminQuotes;
