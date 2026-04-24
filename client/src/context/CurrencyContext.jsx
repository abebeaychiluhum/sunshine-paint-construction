import React, { createContext, useContext, useState, useEffect } from "react";
import { CURRENCIES, DEFAULT_CURRENCY } from "../utils/constants";

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem("selectedCurrency");
    return saved ? JSON.parse(saved) : DEFAULT_CURRENCY; // Default to ETB
  });

  useEffect(() => {
    localStorage.setItem("selectedCurrency", JSON.stringify(currency));
  }, [currency]);

  const convertPrice = (price, fromCurrency = "ETB") => {
    if (!price) return 0;

    // Convert to ETB first (base currency)
    const priceInETB =
      fromCurrency === "ETB"
        ? price
        : price / CURRENCIES.find((c) => c.code === fromCurrency)?.rate;

    // Then convert to selected currency
    return priceInETB * currency.rate;
  };

  const formatPrice = (price, showSymbol = true) => {
    const converted = convertPrice(price);
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted);

    return showSymbol ? `${currency.symbol} ${formatted}` : formatted;
  };

  const value = {
    currency,
    setCurrency,
    currencies: CURRENCIES,
    convertPrice,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
