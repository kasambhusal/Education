import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const UserAvatar = ({ user }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <motion.div className="relative">
            <motion.img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowInfo(true)}
            />
            <AnimatePresence>
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute z-10 bg-white p-4 rounded-lg shadow-lg top-12"
                    >
                        <img
                            src={user.image || "/placeholder.svg"}
                            alt={user.name}
                            className="w-20 h-20 rounded-full mb-2 object-cover" // Keep the circular shape
                        />
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowInfo(false)}
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default UserAvatar;
