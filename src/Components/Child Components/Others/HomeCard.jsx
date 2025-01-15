import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";

const HomeCard = ({ heading, image, text }) => {
  const { themeColor } = useTheme();
  return (
    <motion.div
      className="relative overflow-hidden w-[400px] h-[480px] rounded-2xl shadow-2xl bg-gradient-to-b from-[#EDF2F7] to-[#A0AEC0]"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-[rgba(255,255,255,0.2)] opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Card Content */}
      <motion.div
        className="relative h-full flex flex-col gap-5 items-center p-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card Heading */}
        <motion.h2
          className="font-bold text-3xl"
          style={{ color: themeColor }}
          whileHover={{ scale: 1.1 }}
        >
          {heading}
        </motion.h2>
        {/* Card Image */}
        <motion.div
          className="w-[80%] h-[50%] overflow-hidden rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={`/${image}`}
            alt="cardImage"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        {/* Card Text */}
        <motion.p
          className="text-center text-lg font-semibold"
          style={{ color: themeColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {text}
        </motion.p>
        {/* Explore Button */}
        <motion.button
          className="text-white px-8 py-3 rounded-xl font-semibold text-xl mt-5 shadow-lg"
          style={{ backgroundColor: themeColor }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#6B46C1",
            boxShadow: "0 0 15px rgba(107, 70, 193, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomeCard;
