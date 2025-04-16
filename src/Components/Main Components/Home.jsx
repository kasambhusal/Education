"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRightOutlined } from "@ant-design/icons"
import { useEffect, useState, useRef } from "react"
import HomeCard from "../Child Components/Others/HomeCard"
import FloatingBar from "../Child Components/Others/FloatingBar"
import Testimonial from "../Child Components/Others/Testimonial"
import TrustSection from "../Child Components/Others/TrustSection"
import { Link } from "react-router-dom"

// Animated background particles with better distribution
const ParticleBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Evenly distributed particles across the entire hero section */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-blue-500 opacity-20"
                    initial={{
                        x: `${(i % 5) * 25}%`, // Distribute horizontally in 5 columns
                        y: `${Math.floor(i / 5) * 33}%`, // Distribute vertically in 3 rows
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        x: [
                            `${(i % 5) * 25 - 5 + Math.random() * 10}%`,
                            `${(i % 5) * 25 + 5 + Math.random() * 10}%`,
                            `${(i % 5) * 25 - 5 + Math.random() * 10}%`,
                        ],
                        y: [
                            `${Math.floor(i / 5) * 33 - 5 + Math.random() * 10}%`,
                            `${Math.floor(i / 5) * 33 + 5 + Math.random() * 10}%`,
                            `${Math.floor(i / 5) * 33 - 5 + Math.random() * 10}%`,
                        ],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                    style={{
                        width: `${Math.random() * 100 + 50}px`,
                        height: `${Math.random() * 100 + 50}px`,
                    }}
                />
            ))}

            {/* Add a few larger blobs for visual interest */}
            <motion.div
                className="absolute rounded-full bg-blue-400 opacity-10"
                initial={{ x: "10%", y: "20%", scale: 1 }}
                animate={{
                    scale: [1, 1.2, 1],
                    x: ["10%", "15%", "10%"],
                    y: ["20%", "25%", "20%"],
                }}
                transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                style={{ width: "300px", height: "300px" }}
            />

            <motion.div
                className="absolute rounded-full bg-yellow-300 opacity-10"
                initial={{ x: "70%", y: "70%", scale: 1 }}
                animate={{
                    scale: [1, 1.3, 1],
                    x: ["70%", "75%", "70%"],
                    y: ["70%", "65%", "70%"],
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                style={{ width: "250px", height: "250px" }}
            />
        </div>
    )
}

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
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
}

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Home() {
    const [learnerCount, setLearnerCount] = useState(0)
    const [currentFeature, setCurrentFeature] = useState(0)
    const unlockSectionRef = useRef(null)

    const features = [
        "Personalized Learning Paths",
        "Expert-Led Workshops",
        "Global Networking Opportunities",
        "Cutting-Edge Resources",
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setLearnerCount((prev) => {
                const nextCount = prev + 150
                if (nextCount >= 1510) {
                    clearInterval(timer)
                    return 1510
                }
                return nextCount
            })
        }, 30)

        const featureInterval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length)
        }, 3000)

        return () => {
            clearInterval(timer)
            clearInterval(featureInterval)
        }
    }, [])

    const scrollToUnlock = () => {
        unlockSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    // Parallax effect for hero section
    const { scrollY } = useScroll()
    const heroImageY = useTransform(scrollY, [0, 500], [0, 100])
    const heroTextY = useTransform(scrollY, [0, 500], [0, 50])
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])

    return (
        <div className="overflow-x-hidden relative">
            {/* Hero Section with Modern Design */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Gradient Background with Animated Particles */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e5f4ff] via-[#d0e8ff] to-[#b9e5ff] z-0 w-screen h-screen">

                </div>

                {/* Center container with max-width for better content positioning */}
                <div className="container mx-auto px-4 z-10 py-16 md:py-0 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                        {/* Hero Content - Left Side */}
                        <motion.div
                            className="w-full md:w-[45%] order-2 md:order-1 text-center md:text-left"
                            style={{ y: heroTextY, opacity: heroOpacity }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                                    Welcome to EduSphere
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(19,58,82)] leading-tight mb-6"
                            >
                                Learn, Explore, <br className="hidden md:block" />
                                <span className="text-blue-600">and Empower</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0"
                            >
                                Committed to creating equal and accessible opportunities for students everywhere, empowering the next
                                generation of innovators.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="mb-8"
                            >
                                <div className="flex items-center justify-center md:justify-start">
                                    <span className="text-3xl md:text-4xl font-bold text-blue-600 mr-2">
                                        {learnerCount.toLocaleString()}+
                                    </span>
                                    <span className="text-lg text-gray-700">active learners worldwide</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={scrollToUnlock}
                                    className="px-8 py-4 font-bold text-lg text-white rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Explore More
                                    <ArrowRightOutlined className="animate-bounce" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 font-bold text-lg text-blue-700 rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
                                >
                                    <Link to="/know-more-about-us">Learn More</Link>
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        {/* Hero Image - Right Side */}
                        <motion.div
                            className="w-full md:w-[55%] order-1 md:order-2"
                            style={{ y: heroImageY, opacity: heroOpacity }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative"
                            >
                                <img src="/homeImg.png" alt="EduSphere Learning Platform" className="w-full max-w-md mx-auto" />

                                {/* Decorative elements */}
                                <motion.div
                                    className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-300 rounded-full opacity-70 z-0"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        repeat: Number.POSITIVE_INFINITY,
                                        duration: 4,
                                    }}
                                />
                                <motion.div
                                    className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-400 rounded-full opacity-70 z-0"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                    }}
                                    transition={{
                                        repeat: Number.POSITIVE_INFINITY,
                                        duration: 5,
                                        delay: 1,
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

            </motion.div>

            <FloatingBar />

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="py-16 bg-gray-50"
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        variants={fadeInUpVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-8 text-[rgb(59,66,108)]"
                    >
                        Empowering the Next Generation of Innovators
                    </motion.h2>
                    <motion.p variants={fadeInUpVariants} className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
                        Our platform is designed to nurture curiosity, foster creativity, and build the skills needed for the
                        future.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div key={index} variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4 text-[rgb(19,58,82)]">{feature}</h3>
                                <p className="text-gray-600">
                                    Tailored to meet the unique needs of every learner, ensuring optimal growth and development.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
                <div className="container mx-auto px-4">
                    <motion.h2 variants={fadeInUpVariants} className="text-3xl md:text-4xl font-bold text-center mb-8">
                        Discover Our Key Features
                    </motion.h2>
                    <motion.div variants={fadeInUpVariants} className="text-center mb-12">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentFeature}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl font-semibold"
                            >
                                {features[currentFeature]}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300">
                            <Link to="/know-more-about-us">Learn More</Link>
                        </button>
                    </motion.div>
                </div>
            </motion.section>

            <motion.div
                ref={unlockSectionRef}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="homecardsection flex flex-col items-center justify-center gap-20 py-16"
                id="unlock-section"
            >
                <motion.div variants={itemVariants} className="topcontent flex flex-col gap-3 w-full max-w-3xl px-4">
                    <motion.h2
                        className="toptextheading text-3xl md:text-4xl font-bold text-center w-full text-[rgb(59,66,108)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Unlock Your Potential for a Changing World
                    </motion.h2>
                    <motion.p
                        className="toptext w-full text-center text-gray-600 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Equipping you with skills and opportunities to thrive in the ever-evolving modern world.
                    </motion.p>
                </motion.div>
                <div className="cardgrid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-20 md:gap-y-28 px-4">
                    {[
                        {
                            heading: "Prepare for Maths olympaid",
                            image: "https://www.mathassociationnepal.org.np/static/frontend/img/logo.png",
                            text: "Learn concepts and practice for Nepal Maths Olympiad",
                            redirect: "/menu/courses/math-olympaid-guide",
                        },
                        {
                            heading: "Prepare for NePhO",
                            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjfF1sxDtGAZI2It6Old1h16tPcTu2Uhu3Aw&s",
                            text: "Learn concepts and practice for Nepal Physics Olympiad",
                            redirect: "/menu/courses/physics-olympaid-guide",
                        },
                        {
                            heading: "Upcoming Hackathons",
                            image:
                                "https://media.istockphoto.com/id/1306326254/vector/hackathon-and-datathon-set-of-doodle-style-icons.jpg?s=612x612&w=0&k=20&c=hsAHpcpw5FfzPqRpRnL_RUtRkgH_0l3aQvuxSyTriuc=",
                            text: "Be up-to-date about upcoming hackathon opportunities",
                            redirect: "/menu/opportunities#hackathons",
                        },
                        {
                            heading: "Artificial intelligence & Quantum computing",
                            image:
                                "https://cdn.prod.website-files.com/643d2eea03135260bdaca209/6585cbd47ce157b3cb7f24bf_ai-generated-face%20profile.webp",
                            text: "Tap to explore the future of AI & Quantum!",
                            redirect: "/menu/ai",
                        },
                    ].map((card, index) => (
                        <motion.div key={card.heading} variants={itemVariants}>
                            <HomeCard {...card} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <Testimonial />
            <TrustSection />
        </div>
    )
}
