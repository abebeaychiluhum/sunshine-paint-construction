// src/admin/components/Table.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaChevronUp,
  FaChevronDown,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const Table = ({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  onToggle,
  onView,
  sortBy,
  sortOrder,
  onSort,
  selectable = false,
  selected = [],
  onSelectChange,
}) => {
  const handleSort = (key) => {
    if (sortBy === key) {
      onSort(key, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSort(key, "asc");
    }
  };

  const getSortIcon = (key) => {
    if (sortBy !== key) return null;
    return sortOrder === "asc" ? (
      <FaChevronUp className="text-xs" />
    ) : (
      <FaChevronDown className="text-xs" />
    );
  };

  const handleSelectAll = () => {
    if (selected.length === data.length) {
      onSelectChange([]);
    } else {
      onSelectChange(data.map((row) => row._id));
    }
  };

  const handleSelectRow = (id) => {
    if (selected.includes(id)) {
      onSelectChange(selected.filter((s) => s !== id));
    } else {
      onSelectChange([...selected, id]);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-secondary-200 overflow-hidden">
        <div className="animate-pulse p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-secondary-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-secondary-200 p-12 text-center">
        <p className="text-secondary-500 text-lg">No data found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl border border-secondary-200 overflow-hidden shadow-md"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary-50 border-b border-secondary-200">
              {selectable && (
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selected.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-semibold text-secondary-900 ${
                    column.sortable
                      ? "cursor-pointer hover:bg-secondary-100"
                      : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete || onToggle || onView) && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200">
            {data.map((row) => (
              <motion.tr
                key={row._id}
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                className="transition-colors"
              >
                {selectable && (
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(row._id)}
                      onChange={() => handleSelectRow(row._id)}
                      className="w-4 h-4 rounded"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={`${row._id}-${column.key}`}
                    className="px-6 py-4 text-sm text-secondary-700"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                {(onEdit || onDelete || onToggle || onView) && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <FaEye />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                      )}
                      {onToggle && (
                        <button
                          onClick={() => onToggle(row)}
                          className={`p-2 rounded-lg transition-colors ${
                            row.isActive
                              ? "text-green-600 hover:bg-green-50"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                          title={row.isActive ? "Deactivate" : "Activate"}
                        >
                          {row.isActive ? <FaCheck /> : <FaTimes />}
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Table;
