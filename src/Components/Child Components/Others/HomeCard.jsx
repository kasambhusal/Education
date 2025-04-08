import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";
import { setLocalStorage } from "../../../utils/localStorageUtils";

const HomeCard = ({ heading, image, text, redirect = "", local = {} }) => {
  const { themeColor } = useTheme();
  const navigate = useNavigate();
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const handleExplore = () => {
    if (redirect !== "") {
      if (Object.keys(local).length > 0) {
        setLocalStorage(local.key, local.label, 300000);
      }
      navigate(redirect);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden w-full max-w-[400px] h-auto min-h-[450px] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-b from-[#EDF2F7] to-[#A0AEC0] mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1
      }}
      whileHover={{
        scale: 1.03,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
    >
      {/* Card Content */}
      <motion.div
        className="relative h-full flex flex-col gap-4 items-center p-4 sm:p-6 z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Card Heading */}
        <motion.h2
          className="font-bold text-2xl sm:text-3xl text-center"
          style={{ color: themeColor }}
        >
          {heading}
        </motion.h2>

        {/* Card Image */}
        <motion.div
          className="w-full sm:w-[80%] aspect-video overflow-hidden rounded-xl"
          whileHover={{ scale: 1.03 }}
        >
          <motion.img
            src={image || `/placeholder.svg?height=200&width=300`}
            alt={heading}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
          />
        </motion.div>

        {/* Card Text */}
        <motion.p
          className="text-center text-base sm:text-lg font-medium px-2 flex-grow"
          style={{ color: themeColor }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {text}
        </motion.p>

        {/* Explore Button */}
        <motion.button
          className="text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-lg sm:text-xl mt-3 sm:mt-5 shadow-lg w-full sm:w-auto"
          style={{ backgroundColor: themeColor }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#6B46C1",
            boxShadow: "0 0 15px rgba(107, 70, 193, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExplore}
          aria-label={`Explore ${heading}`}
        >
          Explore
        </motion.button>
      </motion.div>

      {/* Background gradient overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default HomeCard;
