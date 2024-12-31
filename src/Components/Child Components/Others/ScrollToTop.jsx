import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300); // Show button after scrolling down 300px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div>
            {isVisible && (
                <button
                    className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 z-50"
                    onClick={scrollToTop}
                    aria-label="Scroll to Top"
                >
                    <FaArrowUp size={16} />
                </button>
            )}
        </div>
    );
}
