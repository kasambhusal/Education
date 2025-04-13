"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "../../Context/ThemeContext"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"

export default function BottomNav() {
  const { themeColor } = useTheme()
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)
  const navRef = React.useRef(null)
  const controls = useAnimation()

  const navItems = [
    { path: "/menu/opportunities", label: "Opportunities", icon: "🚀" },
    { path: "/menu/clubs", label: "Clubs", icon: "🤝" },
    { path: "/menu/courses", label: "Courses", icon: "🎓" },
    { path: "/menu/ai", label: "AI & Quantum", icon: "🤖" },
  ]

  useEffect(() => {
    // Animate the nav bar when it mounts
    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    })

    // Check if scroll buttons should be visible
    const checkScroll = () => {
      if (navRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = navRef.current
        setShowLeftScroll(scrollLeft > 0)
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
      }
    }

    // Initial check
    setTimeout(checkScroll, 100)

    // Add scroll event listener to the nav container
    const navElement = navRef.current
    if (navElement) {
      navElement.addEventListener("scroll", checkScroll)
      return () => navElement.removeEventListener("scroll", checkScroll)
    }
  }, [controls])

  const handleScroll = (direction) => {
    if (navRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200
      navRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const isActive = (path) => location.pathname === path

  // Find the active index for the initial animation
  const activeIndex = navItems.findIndex((item) => isActive(item.path))

  return (
    <motion.div
      className="relative text-white shadow-lg"
      style={{
        background: `linear-gradient(90deg, ${themeColor} 0%, rgba(90, 90, 237, 0.9) 100%)`,
      }}
      animate={controls}
    >
      {/* Desktop scroll indicators */}
      <AnimatePresence>
        {showLeftScroll && (
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm text-white shadow-lg hover:bg-white/30 transition-all"
            onClick={() => handleScroll("left")}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRightScroll && (
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm text-white shadow-lg hover:bg-white/30 transition-all"
            onClick={() => handleScroll("right")}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation container */}
      <div
        ref={navRef}
        className="flex w-full overflow-x-auto scrollbar-hide py-3 px-4 md:px-12 md:justify-center"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex gap-1 md:gap-3 items-center min-w-min">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <Link
                to={item.path}
                className={`cursor-pointer whitespace-nowrap px-3 py-2 rounded-md transition-all duration-300 flex items-center gap-1.5 ${isActive(item.path) ? "font-medium text-white" : "text-white/80 hover:text-white"
                  }`}
              >
                <span className="hidden md:inline">{item.icon}</span>
                <span className="text-xs md:text-sm lg:text-base">{item.label}</span>
                {isActive(item.path) && (
                  <motion.div
                    className="absolute bottom-[-8px] left-0 right-0 h-1 bg-white rounded-full mx-auto"
                    layoutId="activeIndicator"
                    initial={{ width: "30%", left: "35%" }}
                    animate={{ width: "60%", left: "20%" }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </Link>

              {/* Hover effect */}
              <AnimatePresence>
                {hoveredItem === item.path && !isActive(item.path) && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-md z-[-1]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative right element */}
      <motion.div
        className="absolute top-0 right-0 h-full w-[60px] md:w-[80px] pointer-events-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `linear-gradient(135deg, ${themeColor}00, rgb(90, 90, 237))`,
              `linear-gradient(135deg, ${themeColor}00, rgb(120, 120, 255))`,
              `linear-gradient(135deg, ${themeColor}00, rgb(90, 90, 237))`,
            ],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        />
      </motion.div>

      {/* Mobile indicator */}
      <div className="md:hidden absolute bottom-[-4px] left-0 right-0 flex justify-center">
        <motion.div
          className="h-1 bg-white/70 rounded-full"
          initial={{ width: 20, opacity: 0.5 }}
          animate={{
            width: [20, 40, 20],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [null, "-100%"],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              width: Math.random() * 20 + 5 + "px",
              height: Math.random() * 20 + 5 + "px",
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
