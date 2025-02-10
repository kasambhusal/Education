import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PleaseLogin() {
    const navigate = useNavigate();
    const location = useLocation();


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center"
            >
                <motion.h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    🚀 Access Restricted
                </motion.h2>
                <motion.p className="text-gray-600 mb-6">
                    Please log in to access the Clubs section.
                </motion.p>
                <motion.button
                    onClick={() => navigate('/user/login', { state: { redirectTo: location.pathname } })}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Go to Login
                </motion.button>
            </motion.div>
        </div>
    );
}
