import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const QuoteContext = createContext();

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within QuoteProvider");
  }
  return context;
};

export const QuoteProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestQuote = async (quoteData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/quotes`, quoteData);
      setQuotes((prev) => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to submit quote request";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getQuoteById = (id) => {
    return quotes.find((quote) => quote._id === id);
  };

  const value = {
    quotes,
    loading,
    error,
    requestQuote,
    getQuoteById,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};
