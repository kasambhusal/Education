import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../Context/UserContext';
import SecondaryOpportunities from '../Child Components/Secondary Page Components/SecondaryOpportunities';
import { useNavigate } from 'react-router-dom';

export default function Clubs() {
    const { token } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: 'smooth' });
    }, []);

    if (!token) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center"
                >
                    <motion.h2
                        className="text-2xl font-semibold text-gray-800 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        🚀 Access Restricted
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Please log in to access the Clubs section.
                    </motion.p>
                    <motion.button
                        onClick={() => navigate('/user/login')}
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

    return <SecondaryOpportunities />;
}
