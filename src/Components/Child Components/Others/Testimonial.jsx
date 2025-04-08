"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
    {
        id: 1,
        name: "Rohit Bhusal",
        role: "High School Student",
        image: "/rohit.jpg",
        text: "This platform opened up a world of opportunities for me. I discovered olympiads I never knew existed and found the perfect study materials to prepare for them.",
    },
    {
        id: 2,
        name: "Kasam Bhusal",
        role: "College Freshman",
        image: "/kasam.jpg",
        text: "The hackathon listings helped me find my first coding competition. Now, I'm interning at a top tech company thanks to the skills I gained!",
    },
    {
        id: 3,
        name: "Aman Bhandari",
        role: "Science Enthusiast",
        image: "/aman.jpg",
        text: "Preparing for NePhO seemed daunting until I found this site. The resources and community support here are unparalleled.",
    },
]

export default function Testimonial() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    }

    return (
        <section
            ref={sectionRef}
            className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-7xl mx-auto"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-800"
                    >
                        What Our Users Say
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                variants={itemVariants}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="p-6 sm:p-8 flex flex-col h-full">
                                    {/* Quote icon */}
                                    <div className="mb-4 text-indigo-500">
                                        <Quote size={28} />
                                    </div>

                                    {/* Testimonial text */}
                                    <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.text}"</p>

                                    {/* User info */}
                                    <div className="flex items-center mt-auto">
                                        <motion.div
                                            className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-indigo-100"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <img
                                                src={testimonial.image || `/placeholder.svg?height=56&width=56`}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
