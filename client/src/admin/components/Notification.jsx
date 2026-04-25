// src/admin/components/Notification.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNotification = (event) => {
      const { type, message, duration = 4000 } = event.detail;
      const id = Date.now();

      setNotifications((prev) => [...prev, { id, type, message }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
    };

    window.addEventListener("notification", handleNotification);
    return () => window.removeEventListener("notification", handleNotification);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case "error":
        return <FaExclamationCircle className="text-red-500 text-xl" />;
      case "info":
        return <FaInfoCircle className="text-blue-500 text-xl" />;
      default:
        return null;
    }
  };

  const getColors = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-900";
      case "error":
        return "bg-red-50 border-red-200 text-red-900";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-900";
      default:
        return "bg-secondary-50 border-secondary-200 text-secondary-900";
    }
  };

  return (
    <div className="fixed top-6 right-6 z-40 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-4 rounded-lg border shadow-md flex items-center gap-3 ${getColors(
              notification.type,
            )}`}
          >
            {getIcon(notification.type)}
            <p className="text-sm font-medium flex-1">{notification.message}</p>
            <button
              onClick={() =>
                setNotifications((prev) =>
                  prev.filter((n) => n.id !== notification.id),
                )
              }
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <FaTimes className="text-lg" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notification;

// Helper function to show notifications
export const showNotification = (type, message, duration = 4000) => {
  window.dispatchEvent(
    new CustomEvent("notification", {
      detail: { type, message, duration },
    }),
  );
};
