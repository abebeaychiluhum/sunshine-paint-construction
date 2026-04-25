// src/admin/pages/AdminMessages.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import Badge from "../components/Badge";
import { showNotification } from "../components/Notification";
import API from "../../services/api";
import { FaReply } from "react-icons/fa";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await API.get(`/messages?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setMessages(response.data.messages);
      setTotal(response.data.total);
    } catch (error) {
      showNotification("error", "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Handle reply
  const handleReply = async () => {
    if (!replyText.trim()) {
      showNotification("error", "Reply cannot be empty");
      return;
    }

    try {
      setSubmitting(true);
      await API.post(
        `/messages/${selectedMessage._id}/reply`,
        { content: replyText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );
      showNotification("success", "Reply sent successfully");
      setShowModal(false);
      setReplyText("");
      fetchMessages();
    } catch (error) {
      showNotification("error", "Failed to send reply");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (message) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await API.delete(`/messages/${message._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        showNotification("success", "Message deleted successfully");
        fetchMessages();
      } catch (error) {
        showNotification("error", "Failed to delete message");
      }
    }
  };

  const columns = [
    {
      key: "name",
      label: "From",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "subject",
      label: "Subject",
    },
    {
      key: "type",
      label: "Type",
      render: (value) => <Badge variant="info">{value}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge
          variant={
            value === "unread"
              ? "warning"
              : value === "replied"
                ? "success"
                : "default"
          }
        >
          {value}
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
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Messages</h1>
          <p className="text-secondary-600 mt-1">
            Manage customer messages and inquiries
          </p>
        </div>

        {/* Search & Filter */}
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          filters={{
            status: {
              label: "Status",
              value: statusFilter,
              options: [
                { value: "unread", label: "Unread" },
                { value: "read", label: "Read" },
                { value: "replied", label: "Replied" },
              ],
            },
          }}
          onFilterChange={(key, value) => setStatusFilter(value)}
          loading={loading}
        />

        {/* Table */}
        <Table
          columns={columns}
          data={messages}
          loading={loading}
          onView={(message) => {
            setSelectedMessage(message);
            setShowModal(true);
          }}
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
          title="Message Details"
          onClose={() => {
            setShowModal(false);
            setSelectedMessage(null);
            setReplyText("");
          }}
          size="lg"
          showFooter={false}
        >
          {selectedMessage && (
            <div className="space-y-4">
              {/* Message Info */}
              <div className="bg-secondary-50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-sm text-secondary-600">From</p>
                  <p className="font-semibold text-secondary-900">
                    {selectedMessage.name}
                  </p>
                  <p className="text-sm text-secondary-600">
                    {selectedMessage.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600">Subject</p>
                  <p className="font-semibold text-secondary-900">
                    {selectedMessage.subject}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600">Message</p>
                  <p className="text-secondary-700 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Reply Section */}
              {!selectedMessage.reply && (
                <div className="space-y-3 border-t border-secondary-200 pt-4">
                  <label className="block text-sm font-semibold text-secondary-700">
                    Your Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    rows="4"
                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-secondary-300 rounded-lg text-secondary-700 font-semibold hover:bg-secondary-100"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleReply}
                      disabled={submitting}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
                    >
                      <FaReply /> Send Reply
                    </button>
                  </div>
                </div>
              )}

              {/* Reply Display */}
              {selectedMessage.reply && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 space-y-2">
                  <p className="text-sm font-semibold text-green-900">
                    ✓ Replied
                  </p>
                  <p className="text-sm text-green-700">
                    {selectedMessage.reply.content}
                  </p>
                  <p className="text-xs text-green-600">
                    {new Date(selectedMessage.reply.repliedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </Modal>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminMessages;
