import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Rohit Bhusal.",
        role: "High School Student",
        image: "/rohit.jpg",
        text: "This platform opened up a world of opportunities for me. I discovered olympiads I never knew existed and found the perfect study materials to prepare for them."
    },
    {
        id: 2,
        name: "Kasam Bhusal.",
        role: "College Freshman",
        image: "/kasam.jpg",
        text: "The hackathon listings helped me find my first coding competition. Now, I'm interning at a top tech company thanks to the skills I gained!"
    },
    {
        id: 3,
        name: "Aman Bhandari.",
        role: "Science Enthusiast",
        image: "/aman.jpg",
        text: "Preparing for NePhO seemed daunting until I found this site. The resources and community support here are unparalleled."
    }
];

export default function Testimonial() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    What Our Users Say
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <motion.img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-24 h-24 rounded-full mb-4 object-cover"
                                whileHover={{ scale: 1.1 }}
                            />
                            <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
                            <p className="text-gray-600 mb-4">{testimonial.role}</p>
                            <p className="text-gray-800 italic">&ldquo;{testimonial.text}&rdquo;</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

