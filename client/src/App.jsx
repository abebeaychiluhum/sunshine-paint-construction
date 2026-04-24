import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CartProvider } from "./context/CartContext";
import { QuoteProvider } from "./context/QuoteContext";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import CartDrawer from "./components/CartDrawer";
import CartButton from "./components/CartButton";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";

function App() {
  return (
    <Router>
      <CurrencyProvider>
        <CartProvider>
          <QuoteProvider>
            <LoadingScreen />
            <div className="flex flex-col min-h-screen">
              <Navbar />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/blog" element={<Blog />} />
                </Routes>
              </main>

              <Footer />
            </div>

            <ScrollToTop />
            <WhatsAppButton />
            <CartDrawer />
            <CartButton />
          </QuoteProvider>
        </CartProvider>
      </CurrencyProvider>
    </Router>
  );
}

export default App;
