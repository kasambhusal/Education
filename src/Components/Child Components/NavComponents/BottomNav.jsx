"use client"

import { useState } from "react";
import { useTheme } from "../../Context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNav() {
  const { themeColor } = useTheme();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { path: "/menu/opportunities", label: "Opportunities _" },
    { path: "/menu/exam-prep", label: "Exam-Prep" },
    { path: "/menu/clubs", label: "Clubs" },
    { path: "/menu/courses", label: "Courses" },
    { path: "/menu/ai", label: "AI & Quantum" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      className="relative text-white flex justify-between items-center px-4 md:px-8 py-6 h-[60px] z-10"
      style={{ backgroundColor: themeColor }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex w-full md:w-[85%] gap-2 md:gap-10 md:pl-[150px] text-sm md:text-lg justify-center overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <div
            key={item.path}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              to={item.path}
              className="cursor-pointer whitespace-nowrap px-3 py-2 rounded-md transition-all duration-300 flex items-center"
            >
              {item.label}
              {isActive(item.path) && (
                <motion.div
                  className="absolute bottom-[-12px] left-0 right-0 h-1 bg-white rounded-full mx-auto"
                  layoutId="activeIndicator"
                  initial={{ width: "30%" }}
                  animate={{ width: "60%" }}
                  style={{ width: "60%", left: "20%" }}
                />
              )}
            </Link>
            <AnimatePresence>
              {hoveredItem === item.path && !isActive(item.path) && (
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-md z-[-1]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <motion.div
        className="absolute top-0 right-0 h-full w-[40px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
          background: `linear-gradient(to right, ${themeColor}, rgb(90, 90, 237))`,
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `linear-gradient(to right, ${themeColor}, rgb(90, 90, 237))`,
              `linear-gradient(to right, ${themeColor}, rgb(120, 120, 255))`,
              `linear-gradient(to right, ${themeColor}, rgb(90, 90, 237))`,
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
        />
      </motion.div>

      <div className="md:hidden absolute bottom-[-8px] left-0 right-0 flex justify-center">
        <motion.div
          className="h-1 bg-white rounded-full"
          initial={{ width: 20 }}
          animate={{ width: 40 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>
    </motion.div>
  );
}