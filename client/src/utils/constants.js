export const COMPANY_INFO = {
  name: "SunShine Paint Construction Materials",
  shortName: "SunShine Paint",
  tagline: "Building Dreams, Delivering Excellence",
  email: "info@sunshinepaint.com",
  phone: "+251-911-234567",
  whatsapp: "+251911234567",
  address: "Addis Ababa, Ethiopia",
  workingHours: "Mon - Sat: 8:00 AM - 6:00 PM",
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/sunshinepaint",
  instagram: "https://instagram.com/sunshinepaint",
  twitter: "https://twitter.com/sunshinepaint",
  linkedin: "https://linkedin.com/company/sunshinepaint",
  youtube: "https://youtube.com/@sunshinepaint",
};

export const CURRENCIES = [
  { code: "ETB", symbol: "Br", name: "Ethiopian Birr", rate: 1 },
  { code: "USD", symbol: "$", name: "US Dollar", rate: 0.018 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.017 },
];

export const PRODUCT_CATEGORIES = [
  "Paint & Coatings",
  "Tiles & Flooring",
  "Sanitary Ware",
  "Marble & Granite",
  "Lighting",
  "Steel Products",
  "Construction Tools",
  "Interior Products",
  "Adhesives & Sealants",
  "Doors & Windows",
];

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
