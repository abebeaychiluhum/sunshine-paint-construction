import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    const trackPageView = () => {
      // You can integrate with Google Analytics, Mixpanel, etc.
      console.log("Page View:", location.pathname);

      // Example: Google Analytics
      if (window.gtag) {
        window.gtag("config", "GA_MEASUREMENT_ID", {
          page_path: location.pathname,
        });
      }
    };

    trackPageView();
  }, [location]);

  return null;
};

export default useAnalytics;
