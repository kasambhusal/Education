import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Using scrollYProgress to track scroll position
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        // Show the button only when scrolled down more than 300px
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Function to smoothly scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Ensure smooth scroll behavior
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50 cursor-pointer"
            onClick={scrollToTop} // Click event to scroll to top
        >
            <button
                className="bg-blue-400 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-md hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Scroll to Top"
            >
                <FaArrowUp size={20} />
            </button>

            <svg className="absolute -top-1 -left-1 w-14 h-14" viewBox="0 0 44 44">
                <motion.circle
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="4"
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
    );
}
