import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AccessRestricted() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center"
            >
                <motion.h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    🚫 Access Denied
                </motion.h2>
                <motion.p className="text-gray-600 mb-6">
                    Sorry, you are not an admin. This section is restricted.
                </motion.p>
                <motion.button
                    onClick={() => navigate('/')}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Return to Home
                </motion.button>
            </motion.div>
        </div>
    );
}
