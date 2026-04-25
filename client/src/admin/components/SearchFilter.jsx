// src/admin/components/SearchFilter.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchFilter = ({
  search,
  onSearchChange,
  filters = {},
  onFilterChange,
  loading = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-secondary-200 p-4 shadow-md space-y-4"
    >
      {/* Search Bar */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          disabled={loading}
          className="w-full pl-12 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors disabled:bg-secondary-100"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Filters */}
      {Object.keys(filters).length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(filters).map(([key, filter]) => (
            <select
              key={key}
              value={filter.value}
              onChange={(e) => onFilterChange(key, e.target.value)}
              disabled={loading}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors disabled:bg-secondary-100"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SearchFilter;
