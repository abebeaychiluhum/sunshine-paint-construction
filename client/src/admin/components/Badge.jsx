// src/admin/components/Badge.jsx
import React from "react";

const Badge = ({ variant = "default", children }) => {
  const variants = {
    default: "bg-secondary-100 text-secondary-700",
    primary: "bg-primary-100 text-primary-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
