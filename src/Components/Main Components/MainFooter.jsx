import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../Context/ThemeContext";
import Contact from "../Child Components/Others/Contact";
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from "react-router-dom";

const Footer = () => {
    const { themeColor } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <footer className="bg-gradient-to-b from-blue-900 to-blue-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="space-y-4">
                        <img src="/logo.png" alt="logo" className="w-[200px] h-auto" />
                        <h3 className="text-xl font-semibold">Follow Us</h3>
                        <Contact />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold mb-4">Opportunities</h3>
                        <ul className="space-y-2">
                            {["Scholarships", "Hackathon", "Workshops", "Olympiad"].map((item) => (
                                <motion.li
                                    key={item}
                                    className="flex items-center"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold mb-4">Exam Prep</h3>
                        <ul className="space-y-2">
                            <motion.li
                                className="flex items-center"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <ChevronRightIcon className="w-4 h-4 mr-2" />
                                <Link to="/courses/physics-olympaid-guide">
                                    NePho
                                </Link>
                            </motion.li>
                            <motion.li
                                className="flex items-center"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <ChevronRightIcon className="w-4 h-4 mr-2" />
                                <Link to="/courses/sat">
                                    SAT
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold mb-4">Team Members</h3>
                        {[
                            { name: "Kasam Bhusal", role: "CEO" },
                            { name: "Aman Bhandari", role: "CEO" },
                            { name: "Rohit Busal", role: "CEO" },
                        ].map((member) => (
                            <motion.div
                                key={member.name}
                                className="mb-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <p className="font-semibold">{member.role}</p>
                                <p>{member.name}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="bg-blue-800 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-300">
                        &copy; 2024 Education. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-300 mt-2 sm:mt-0">
                        Developed by{" "}
                        <a
                            href="https://kasambhusal.com.np/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white transition-colors"
                        >
                            KRA Group
                        </a>
                    </p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;

