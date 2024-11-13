import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-950 text-white">
      {/* Large Circular Loader */}
      <motion.div
        className="relative mb-10"
        style={{ width: 120, height: 120 }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear',
        }}
      >
        <div className="absolute inset-0 w-full h-full border-8 border-yellow-400 border-t-transparent border-b-transparent rounded-full animate-spin-slow"></div>
      </motion.div>

      {/* Logo - Larger and Pulsing */}
      <motion.div
        className="font-extrabold text-4xl mb-4"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.01, 1], opacity: [0.98, 1, 0.98] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        <span className="text-yellow-400">Time</span>
        <span className="text-white">Table</span>
      </motion.div>

      {/* Loading Message with Animated Dots */}
      <div className="text-lg font-semibold flex space-x-1">
        <span>Loading</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          .
        </motion.span>
      </div>
    </div>
  );
};

export default LoadingScreen;
