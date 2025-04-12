"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { useTheme } from "../../Context/ThemeContext"
import { setLocalStorage } from "../../../utils/localStorageUtils"

const HomeCard = ({ heading, image, text, redirect = "", local = {} }) => {
  const { themeColor } = useTheme()
  const navigate = useNavigate()
  const cardRef = React.useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  const handleExplore = () => {
    if (redirect !== "") {
      if (Object.keys(local).length > 0) {
        setLocalStorage(local.key, local.label, 300000)
      }
      navigate(redirect)
    }
  }

  // Define complementary colors for better design
  const accentColor = themeColor
  const bgGradientStart = "#f8fafc" // Light color for gradient start
  const bgGradientEnd = "#e2e8f0" // Slightly darker for gradient end
  const textColor = "#1e293b" // Dark slate for text

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-[400px] h-auto min-h-[450px] rounded-2xl mx-auto overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1,
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      style={{
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        background: `linear-gradient(135deg, ${bgGradientStart} 0%, ${bgGradientEnd} 100%)`,
        border: "1px solid rgba(255, 255, 255, 0.7)",
      }}
    >
      {/* Card Content */}
      <motion.div
        className="relative h-full flex flex-col gap-5 items-center p-6 sm:p-7 z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Card Heading */}
        <motion.h2 className="font-bold text-2xl sm:text-3xl text-center" style={{ color: accentColor }}>
          {heading}
        </motion.h2>

        {/* Card Image */}
        <motion.div
          className="w-full aspect-[4/3] overflow-hidden rounded-xl"
          style={{
            backgroundColor: "white",
            border: "1px solid rgba(255, 255, 255, 0.7)",
          }}
        >
          <motion.img
            src={image || `/placeholder.svg?height=200&width=300`}
            alt={heading}
            className="h-full w-full object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
          />
        </motion.div>

        {/* Card Text */}
        <motion.p
          className="text-center text-base sm:text-lg font-medium px-2 flex-grow"
          style={{ color: textColor }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {text}
        </motion.p>

        {/* Explore Button */}
        <motion.button
          className="text-white px-8 py-3 rounded-xl font-semibold text-lg sm:text-xl mt-4 w-full sm:w-auto"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 4px 14px rgba(${Number.parseInt(accentColor.slice(1, 3), 16)}, ${Number.parseInt(accentColor.slice(3, 5), 16)}, ${Number.parseInt(accentColor.slice(5, 7), 16)}, 0.3)`,
          }}
          whileHover={{
            scale: 1.03,
            boxShadow: `0 6px 20px rgba(${Number.parseInt(accentColor.slice(1, 3), 16)}, ${Number.parseInt(accentColor.slice(3, 5), 16)}, ${Number.parseInt(accentColor.slice(5, 7), 16)}, 0.5)`,
          }}
          whileTap={{ scale: 0.97 }}
          onClick={handleExplore}
          aria-label={`Explore ${heading}`}
        >
          Explore
        </motion.button>
      </motion.div>

      {/* Subtle decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
          transform: "translate(-30%, 30%)",
        }}
      />
    </motion.div>
  )
}

export default HomeCard
