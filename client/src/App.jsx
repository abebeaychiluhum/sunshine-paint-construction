import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <CurrencyProvider>
        <CartProvider>
          <QuoteProvider>
            <LoadingScreen />
            <div className="flex flex-col min-h-screen">
              <Navbar />

              <main className="flex-1 bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="container-custom section-padding text-center">
                  <h1 className="text-6xl font-display font-bold text-gradient mb-4">
                    SunShine Paint
                  </h1>
                  <p className="text-2xl text-secondary-600 mb-8">
                    Construction Materials Import and Interior
                  </p>

                  {/* Add some height to test scroll */}
                  <div className="mt-32 space-y-8">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="card max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-2">
                          Feature {i + 1}
                        </h3>
                        <p className="text-secondary-600">
                          Testing all components together
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
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
