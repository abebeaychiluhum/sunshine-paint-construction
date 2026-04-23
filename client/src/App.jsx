import React from "react";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom section-padding text-center">
          <h1 className="text-6xl font-display font-bold text-gradient mb-4">
            SunShine Paint
          </h1>
          <p className="text-2xl text-secondary-600 mb-8">
            Construction Materials Import and Interior
          </p>
          <div className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            Coming Soon
          </div>

          {/* Add some height to test scroll */}
          <div className="mt-32 space-y-8">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="card max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-2">Feature {i + 1}</h3>
                <p className="text-secondary-600">
                  Testing scroll functionality and components
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
}

export default App;
