import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[rgba(229,244,255,0.8)] to-[rgba(185,229,255,0.8)] text-[rgb(59,66,108)]">
            {/* Animated Icon */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-36 h-36 rounded-full bg-[rgb(19,58,82)] shadow-lg"
            >
                <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="text-white text-6xl font-bold"
                >
                    404
                </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-8 text-4xl font-bold text-center"
            >
                Page Not Found
            </motion.h1>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-4 text-lg text-center text-gray-600"
            >
                Sorry, the page you’re looking for doesn’t exist or has been moved.
            </motion.p>

            {/* Navigation Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6"
            >
                <Link to="/">
                    <button className="px-6 py-3 text-lg font-semibold text-white bg-[rgb(19,58,82)] rounded-full shadow-md hover:bg-[rgb(29,78,112)] transition-transform duration-300 transform hover:scale-105">
                        Back to Home
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
