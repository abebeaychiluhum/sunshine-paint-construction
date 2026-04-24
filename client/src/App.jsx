import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CartProvider } from "./context/CartContext";
import { QuoteProvider } from "./context/QuoteContext";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <Router>
      <CurrencyProvider>
        <CartProvider>
          <QuoteProvider>
            <LoadingScreen />
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
              <div className="container-custom section-padding text-center">
                <h1 className="text-6xl font-display font-bold text-gradient mb-4">
                  SunShine Paint
                </h1>
                <p className="text-2xl text-secondary-600 mb-8">
                  Construction Materials Import and Interior
                </p>

                {/* Add some height to test scroll and navbar */}
                <div className="mt-32 space-y-8">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="card max-w-2xl mx-auto">
                      <h3 className="text-2xl font-bold mb-2">
                        Feature {i + 1}
                      </h3>
                      <p className="text-secondary-600">
                        Testing navbar scroll behavior and components
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ScrollToTop />
            <WhatsAppButton />
          </QuoteProvider>
        </CartProvider>
      </CurrencyProvider>
    </Router>
  );
}

export default App;
