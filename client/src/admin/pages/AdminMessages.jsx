// src/admin/pages/AdminMessages.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaReply,
  FaTrash,
  FaCheck,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaFlag,
  FaArchive,
} from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import Badge from "../components/Badge";
import { showNotification } from "../components/Notification";
import API from "../../services/api";

const AdminMessages = () => {
  // State Management
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Modal State
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyErrors, setReplyErrors] = useState({});

  // Get auth header
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  });

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
        ...(typeFilter && { type: typeFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
      });

      const response = await API.get(`/messages?${params}`, getAuthHeader());

      setMessages(response.data.messages || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      showNotification("error", "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter, typeFilter, priorityFilter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Handle view message
  const handleViewMessage = async (message) => {
    try {
      setSelectedMessage(message);
      setShowDetailModal(true);

      // Mark as read if unread
      if (message.status === "unread") {
        await API.put(
          `/messages/${message._id}`,
          { status: "read" },
          getAuthHeader(),
        );
        message.status = "read";
        fetchMessages();
      }
    } catch (error) {
      console.error("Error viewing message:", error);
    }
  };

  // Handle delete
  const handleDelete = async (message) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      await API.delete(`/messages/${message._id}`, getAuthHeader());
      showNotification("success", "Message deleted successfully");
      if (showDetailModal) {
        setShowDetailModal(false);
      }
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      showNotification("error", "Failed to delete message");
    }
  };

  // Handle reply
  const handleSendReply = async () => {
    // Validation
    if (!replyText.trim()) {
      setReplyErrors({ reply: "Reply cannot be empty" });
      return;
    }

    if (replyText.trim().length < 10) {
      setReplyErrors({ reply: "Reply must be at least 10 characters" });
      return;
    }

    try {
      setSubmitting(true);

      await API.post(
        `/messages/${selectedMessage._id}/reply`,
        { content: replyText },
        getAuthHeader(),
      );

      showNotification("success", "Reply sent successfully");
      setReplyText("");
      setReplyErrors({});
      setShowReplyModal(false);

      // Update message status
      selectedMessage.status = "replied";
      selectedMessage.reply = {
        content: replyText,
        repliedBy: JSON.parse(localStorage.getItem("adminUser")).id,
        repliedAt: new Date().toISOString(),
      };

      fetchMessages();
    } catch (error) {
      console.error("Error sending reply:", error);
      showNotification(
        "error",
        error.response?.data?.message || "Failed to send reply",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle archive
  const handleArchive = async (message) => {
    try {
      await API.put(
        `/messages/${message._id}`,
        { status: "archived" },
        getAuthHeader(),
      );
      showNotification("success", "Message archived");
      if (message._id === selectedMessage?._id) {
        setShowDetailModal(false);
      }
      fetchMessages();
    } catch (error) {
      showNotification("error", "Failed to archive message");
    }
  };

  // Handle mark as read
  const handleMarkAsRead = async (message) => {
    try {
      await API.put(
        `/messages/${message._id}`,
        { status: "read" },
        getAuthHeader(),
      );
      showNotification("success", "Marked as read");
      fetchMessages();
    } catch (error) {
      showNotification("error", "Failed to mark as read");
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "warning";
      case "read":
        return "info";
      case "replied":
        return "success";
      case "archived":
        return "default";
      default:
        return "default";
    }
  };

  // Get priority badge color
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
      label: "From",
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-semibold text-secondary-900">{value}</p>
          <p className="text-xs text-secondary-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (value) => (
        <p className="font-medium text-secondary-800 truncate max-w-xs">
          {value}
        </p>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (value) => {
        const typeIcons = {
          general: "📋",
          support: "🆘",
          quote: "💰",
          complaint: "⚠️",
          feedback: "⭐",
        };
        return (
          <Badge variant="info">
            {typeIcons[value]} {value}
          </Badge>
        );
      },
    },
    {
      key: "priority",
      label: "Priority",
      render: (value) => (
        <Badge variant={getPriorityColor(value)}>
          <FaFlag className="inline mr-1 text-xs" />
          {value}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge variant={getStatusColor(value)}>
          {value === "unread" && <FaEnvelope className="inline mr-1" />}
          {value === "replied" && <FaCheck className="inline mr-1" />}
          {value === "archived" && <FaArchive className="inline mr-1" />}
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
          <h1 className="text-3xl font-bold text-secondary-900">Messages</h1>
          <p className="text-secondary-600 mt-1">
            Manage customer messages and inquiries ({total} total)
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
              <p className="text-sm text-secondary-600">Total Messages</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-amber-600">
                {messages.filter((m) => m.status === "unread").length}
              </p>
              <p className="text-sm text-secondary-600">Unread</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-blue-600">
                {messages.filter((m) => m.status === "read").length}
              </p>
              <p className="text-sm text-secondary-600">Read</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-green-600">
                {messages.filter((m) => m.status === "replied").length}
              </p>
              <p className="text-sm text-secondary-600">Replied</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-secondary-200">
              <p className="text-2xl font-bold text-red-600">
                {messages.filter((m) => m.priority === "high").length}
              </p>
              <p className="text-sm text-secondary-600">High Priority</p>
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
                  { value: "unread", label: "Unread" },
                  { value: "read", label: "Read" },
                  { value: "replied", label: "Replied" },
                  { value: "archived", label: "Archived" },
                ],
              },
              type: {
                label: "Filter by Type",
                value: typeFilter,
                options: [
                  { value: "general", label: "General Inquiry" },
                  { value: "support", label: "Support" },
                  { value: "quote", label: "Quote Request" },
                  { value: "complaint", label: "Complaint" },
                  { value: "feedback", label: "Feedback" },
                ],
              },
              priority: {
                label: "Filter by Priority",
                value: priorityFilter,
                options: [
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ],
              },
            }}
            onFilterChange={(key, value) => {
              if (key === "status") setStatusFilter(value);
              if (key === "type") setTypeFilter(value);
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
            data={messages}
            loading={loading}
            onView={handleViewMessage}
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
          title="Message Details"
          onClose={() => {
            setShowDetailModal(false);
            setSelectedMessage(null);
          }}
          size="lg"
          showFooter={false}
        >
          {selectedMessage && (
            <div className="space-y-6">
              {/* Message Info */}
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 rounded-lg border border-secondary-200 space-y-4">
                {/* From */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                      From
                    </p>
                    <p className="text-lg font-bold text-secondary-900 mt-1">
                      {selectedMessage.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                      Email
                    </p>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-lg font-semibold text-primary-600 hover:text-primary-700 mt-1"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                      Phone
                    </p>
                    {selectedMessage.phone ? (
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="text-lg font-semibold text-primary-600 hover:text-primary-700 mt-1 flex items-center gap-2"
                      >
                        <FaPhone className="text-sm" />
                        {selectedMessage.phone}
                      </a>
                    ) : (
                      <p className="text-secondary-500 mt-1">Not provided</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary-600 uppercase tracking-wide">
                      Subject
                    </p>
                    <p className="text-lg font-semibold text-secondary-900 mt-1">
                      {selectedMessage.subject}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-3 gap-4 border-t border-secondary-300 pt-4">
                  <div>
                    <p className="text-xs font-semibold text-secondary-600">
                      Type
                    </p>
                    <Badge variant="info" className="mt-1">
                      {selectedMessage.type}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary-600">
                      Priority
                    </p>
                    <Badge
                      variant={getPriorityColor(selectedMessage.priority)}
                      className="mt-1"
                    >
                      {selectedMessage.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary-600">
                      Date
                    </p>
                    <p className="text-sm text-secondary-700 mt-1">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <p className="text-sm font-semibold text-secondary-600 uppercase tracking-wide mb-3">
                  Message
                </p>
                <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-200">
                  <p className="text-secondary-800 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Reply Section */}
              {selectedMessage.reply ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <FaCheck className="text-green-600" />
                    <p className="font-semibold text-green-900">Reply Sent ✓</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-secondary-800 whitespace-pre-wrap">
                      {selectedMessage.reply.content}
                    </p>
                  </div>
                  <p className="text-xs text-green-700">
                    <FaClock className="inline mr-1" />
                    {new Date(selectedMessage.reply.repliedAt).toLocaleString()}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 border-t border-secondary-200 pt-4">
                  <p className="text-sm font-semibold text-secondary-700">
                    Send Reply
                  </p>
                  {!showReplyModal ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowReplyModal(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      <FaReply /> Reply to Message
                    </motion.button>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => {
                          setReplyText(e.target.value);
                          setReplyErrors({});
                        }}
                        placeholder="Type your reply here..."
                        rows="5"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 transition-colors resize-none ${
                          replyErrors.reply
                            ? "border-red-500"
                            : "border-secondary-300"
                        }`}
                      />
                      {replyErrors.reply && (
                        <p className="text-xs text-red-600">
                          {replyErrors.reply}
                        </p>
                      )}
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setShowReplyModal(false);
                            setReplyText("");
                            setReplyErrors({});
                          }}
                          className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-700 font-semibold hover:bg-secondary-100 transition-colors"
                        >
                          Cancel
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSendReply}
                          disabled={submitting}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <FaReply /> Send Reply
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="border-t border-secondary-200 pt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {selectedMessage.status !== "archived" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleArchive(selectedMessage)}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary-200 text-secondary-700 rounded-lg font-semibold hover:bg-secondary-300 transition-colors"
                    >
                      <FaArchive className="text-sm" /> Archive
                    </motion.button>
                  )}
                  {selectedMessage.status === "unread" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMarkAsRead(selectedMessage)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                    >
                      <FaCheck className="text-sm" /> Mark as Read
                    </motion.button>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleDelete(selectedMessage);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                >
                  <FaTrash className="text-sm" /> Delete
                </motion.button>
              </div>
            </div>
          )}
        </Modal>

        {/* Close Modal Button */}
        {showDetailModal && (
          <button
            onClick={() => setShowDetailModal(false)}
            className="hidden"
          />
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default AdminMessages;
