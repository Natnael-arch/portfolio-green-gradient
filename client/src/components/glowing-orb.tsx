import { motion } from "framer-motion";

export function GlowingOrb() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #8EB69B 0%, #235347 40%, #0B2B26 70%, #051F20 100%)",
          boxShadow: "0 0 80px rgba(142, 182, 155, 0.4), 0 0 160px rgba(35, 83, 71, 0.3), inset 0 0 80px rgba(142, 182, 155, 0.2)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-4 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(218, 241, 222, 0.3) 0%, transparent 50%)",
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-8 left-8 w-12 h-12 md:w-16 md:h-16 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(218, 241, 222, 0.8) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent 0%, rgba(142, 182, 155, 0.1) 25%, transparent 50%, rgba(35, 83, 71, 0.1) 75%, transparent 100%)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
