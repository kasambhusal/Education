import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { motion, AnimatePresence } from "framer-motion"

const UserAvatar = ({ user }) => {
    const [showInfo, setShowInfo] = useState(false)

    const overlayVariants = {
        hidden: { y: "-100%" },
        visible: { y: 0 },
    }

    const contentVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    }

    return (
        <>
            <motion.img
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowInfo(true)}
            />
            <AnimatePresence>
                {showInfo && (
                    <motion.div
                        className="fixed inset-0 left-[-20px] top-0bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                        onClick={() => setShowInfo(false)}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <motion.div
                            className="bg-white w-full max-w-md mx-auto rounded-lg shadow-2xl overflow-hidden"
                            variants={contentVariants}
                            onClick={(e) => e.stopPropagation()}
                            transition={{ delay: 0.1, duration: 0.3 }}
                        >
                            <div className="relative">
                                <img
                                    src={user.image || "/placeholder.svg"}
                                    alt={user.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                <button
                                    className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                                    onClick={() => setShowInfo(false)}
                                >
                                    <XMarkIcon className="w-8 h-8" />
                                </button>
                            </div>
                            <div className="p-6 text-center">
                                <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                                <p className="text-lg text-gray-600">{user.email}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default UserAvatar
