import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Products
export const getProducts = (params) => api.get("/products", { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const getCategories = () => api.get("/products/categories");

// Auth
export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (userData) => api.post("/auth/register", userData);
export const getProfile = () => api.get("/auth/me");
export const updateProfile = (data) => api.put("/auth/profile", data);

// Quotes
export const createQuote = (quoteData) => api.post("/quotes", quoteData);

// Messages
export const sendMessage = (messageData) => api.post("/messages", messageData);

export default api;
