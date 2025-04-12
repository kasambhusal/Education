"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { FaArrowUp } from "react-icons/fa"

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    // Using scrollYProgress to track scroll position
    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    useEffect(() => {
        // Show the button only when scrolled down more than 300px
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Function to smoothly scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Ensure smooth scroll behavior
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50 cursor-pointer"
            onClick={scrollToTop} // Click event to scroll to top
        >
            <button
                className="bg-[#3B4874] text-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md hover:bg-[#4a5a8d] transition-all duration-300 transform hover:scale-105"
                aria-label="Scroll to Top"
            >
                <FaArrowUp size={16} />
            </button>

            <svg className="absolute -top-1 -left-1 w-12 h-12" viewBox="0 0 44 44">
                <motion.circle
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    stroke="#3B4874"
                    strokeWidth="2.5"
                    style={{
                        pathLength: scaleX, // Progress of the path based on scroll
                        rotate: -90,
                        originX: 0.5,
                        originY: 0.5,
                        strokeLinecap: "round",
                    }}
                />
            </svg>
        </motion.div>
    )
}
