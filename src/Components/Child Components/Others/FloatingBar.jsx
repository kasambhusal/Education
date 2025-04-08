"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const floatingBarItems = [
    { icon: "uptodate.svg", title: "Up to Date", desc: "Recent content and blogs" },
    { icon: "navigation.svg", title: "Navigation", desc: "Throughout Guidance" },
    { icon: "expose.svg", title: "Exposure", desc: "Information of upcoming events" },
    { icon: "exam.svg", title: "Preparation", desc: "Making you ready for competitions" },
]

export default function FloatingBar() {
    const barRef = useRef(null)
    const isInView = useInView(barRef, { once: true, amount: 0.2 })

    // Container animation
    const containerVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    // Item animation
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    }

    return (
        <motion.div
            ref={barRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="floatingbarinhome relative -mt-10 sm:-mt-12 md:-mt-16 lg:-mt-20 mx-4 sm:mx-auto max-w-7xl"
        >
            <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-70" />

                {/* Content */}
                <div className="relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {floatingBarItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                variants={itemVariants}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                                    background: "white",
                                }}
                                className="flex flex-col gap-3 items-center justify-center p-4 rounded-lg transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm hover:bg-white"
                            >
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                    <motion.div
                                        className="absolute inset-0 bg-blue-100 rounded-full opacity-20"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatType: "reverse",
                                            ease: "easeInOut",
                                            delay: index * 0.2,
                                        }}
                                    />
                                    <motion.img
                                        src={item.icon || "/placeholder.svg?height=50&width=50"}
                                        className="w-10 h-10 relative z-10"
                                        alt={item.title}
                                        whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                                        transition={{ duration: 0.5 }}
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-sm text-center text-gray-600 max-w-[200px]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
