"use client"
import { motion } from "framer-motion"
import Contact from "../Child Components/Others/Contact"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { Link, useNavigate } from "react-router-dom"
import { setLocalStorage } from "../../utils/localStorageUtils"

const Footer = () => {
    const navigate = useNavigate()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    }

    const OppourtunityClick = (name) => {
        setLocalStorage("selectedOpportunity", name, 300000)
        navigate("/menu/opportunities")
    }

    return (
        <footer className="bg-gradient-to-b from-[#6264D9] to-[#30415A] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <motion.div
                    className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Logo and Social Media Section */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-4 col-span-2 md:col-span-1 flex flex-col items-center md:items-start"
                    >
                        <div className="w-40 sm:w-48 md:w-auto">
                            <img
                                src="/logo2.png"
                                alt="logo"
                                className="max-w-full h-auto"
                                style={{
                                    borderRadius: "5px",
                                    boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.8)",
                                }}
                            />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold mt-4">Follow Us</h3>
                        <div className="w-full flex justify-center md:justify-start">
                            <Contact />
                        </div>
                    </motion.div>

                    {/* Opportunities Section */}
                    <motion.div variants={itemVariants} className="col-span-1">
                        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Opportunities</h3>
                        <ul className="space-y-1 md:space-y-2">
                            {["Competitions", "Hackathons", "Workshops", "Scholarships"].map((item) => (
                                <motion.li
                                    key={item}
                                    className="flex items-center cursor-pointer text-sm md:text-base"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    onClick={() => OppourtunityClick(item)}
                                >
                                    <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                                    <span className="line-clamp-1">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Exam Prep Section */}
                    <motion.div variants={itemVariants} className="col-span-1">
                        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Exam Prep</h3>
                        <ul className="space-y-1 md:space-y-2">
                            <motion.li
                                className="flex items-center cursor-pointer text-sm md:text-base"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                                <Link to="/menu/courses/physics-olympaid-guide" className="line-clamp-1">
                                    NePho
                                </Link>
                            </motion.li>
                            <motion.li
                                className="flex items-center cursor-pointer text-sm md:text-base"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                                <Link to="/menu/courses/math-olympaid-guide" className="line-clamp-1">
                                    MAT
                                </Link>
                            </motion.li>
                            <motion.li
                                className="flex items-center cursor-pointer text-sm md:text-base"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                                <Link to="/menu/courses/sat-preparation" className="line-clamp-1">
                                    SAT
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Team Members Section */}
                    <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 mt-4 md:mt-0">
                        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Team Members</h3>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                            {[
                                { name: "Kasam Bhusal", role: "Founder" },
                                { name: "Aman Bhandari", role: "Co-Founder" },
                                { name: "Rohit Busal", role: "Co-Founder" },
                            ].map((member) => (
                                <motion.div
                                    key={member.name}
                                    className="mb-1 md:mb-2"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <p className="font-semibold text-gray-300 text-xs md:text-sm">{member.role}</p>
                                    <p className="text-sm md:text-base">{member.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Copyright Section */}
            <motion.div
                className="bg-[#394771] py-3 md:py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-xs sm:text-sm text-gray-300">&copy; 2024 EduSphere. All rights reserved.</p>
                    <p className="text-xs sm:text-sm text-gray-300 mt-2 sm:mt-0">
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
    )
}

export default Footer
