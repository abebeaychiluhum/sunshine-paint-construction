import React from "react";
import { motion } from "framer-motion";

const Loader = ({ size = "md", text = "Loading...", fullScreen = false }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const LoaderContent = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <motion.div
          className={`${sizes[size]} border-4 border-primary-200 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 rounded-full"></div>
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
        </motion.div>
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-secondary-600 font-semibold"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <LoaderContent />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <LoaderContent />
    </div>
  );
};

export default Loader;

// Alternative spinner variations
export const SpinnerDots = () => (
  <div className="flex space-x-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-3 h-3 bg-primary-600 rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

export const SpinnerPulse = () => (
  <motion.div
    className="w-12 h-12 bg-primary-600 rounded-full"
    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);
