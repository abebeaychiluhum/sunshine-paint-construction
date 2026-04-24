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
import Home from "./pages/Home";
import Products from "./pages/Products";

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
