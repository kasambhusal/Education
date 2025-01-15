import React from 'react'
import { motion } from 'framer-motion'

const floatingBarItems = [
    { icon: "uptodate.svg", title: "Up to Date", desc: "Recent content and blogs" },
    { icon: "navigation.svg", title: "Navigation", desc: "Throughout Guidance" },
    { icon: "expose.svg", title: "Exposure", desc: "Information of upcoming events" },
    { icon: "exam.svg", title: "Preparation", desc: "Making you ready for competitions" }
]

export default function FloatingBar() {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="floatingbarinhome flex gap-5 justify-center w-[75vw] relative bottom-[50px] bg-gray-100 mx-auto shadow-lg p-5 rounded-lg hover:shadow-xl transition-shadow duration-300"
        >
            {floatingBarItems.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3 + (0.2 * index) }}
                    whileHover={{ 
                        y: -5, 
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        background: "white"
                    }}
                    className="w-[200px] flex flex-col gap-3 items-center justify-center p-4 rounded-lg transition-all duration-300 cursor-pointer"
                >
                    <motion.img 
                        src={item.icon || "/placeholder.svg"} 
                        className="w-1/3 h-[50%]" 
                        alt={item.title}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className="text-lg font-semibold">{item.title}</div>
                    <div className="w-[150px] text-[14px] text-center text-gray-600">{item.desc}</div>
                </motion.div>
            ))}
        </motion.div>
    )
}

