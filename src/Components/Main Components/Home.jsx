import { motion } from 'framer-motion'
import { ArrowRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import HomeCard from '../Child Components/Others/HomeCard'
import FloatingBar from '../Child Components/Others/FloatingBar'
import Testimonial from '../Child Components/Others/Testimonial'
import TrustSection from '../Child Components/Others/TrustSection'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Home() {
    const [learnerCount, setLearnerCount] = useState(0)
    const [currentFeature, setCurrentFeature] = useState(0)

    const features = [
        "Personalized Learning Paths",
        "Expert-Led Workshops",
        "Global Networking Opportunities",
        "Cutting-Edge Resources"
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setLearnerCount(prev => {
                const nextCount = prev + 150
                if (nextCount >= 10000) {
                    clearInterval(timer)
                    return 10000
                }
                return nextCount
            })
        }, 30)

        const featureInterval = setInterval(() => {
            setCurrentFeature(prev => (prev + 1) % features.length)
        }, 3000)

        return () => {
            clearInterval(timer)
            clearInterval(featureInterval)
        }
    }, [])

    return (
        <div className="overflow-x-hidden relative">

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex flex-col md:flex-row w-screen px-5 py-8 bg-gradient-to-b from-[rgba(229,244,255,0.8)] to-[rgba(185,229,255,0.8)] min-h-screen relative'
            >
                <Tilt className="imageDiv md:ml-28 flex-[1] h-full" perspective={500}>
                    <motion.img
                        src="/homeImg.png"
                        alt="Main Image"
                        className='w-full max-w-[500px] mx-auto hover:scale-105 transition-transform duration-300'
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                </Tilt>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="homerightcontent flex-[1] flex flex-col gap-6 justify-center"
                >
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="heading text-[rgb(59,66,108)] font-bold text-4xl md:text-6xl w-full md:w-[70%]"
                    >
                        Learn, Explore, and Empower
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="middle text-lg w-full md:w-[70%]"
                    >
                        Committed to creating equal and accessible opportunities for students everywhere.
                    </motion.p>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-[rgb(18,23,93)] font-bold text-2xl md:text-3xl"
                    >
                        {learnerCount.toLocaleString()}+ learners
                    </motion.h2>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className='w-full flex justify-start md:justify-center'
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="explore px-4 py-3 font-bold text-xl md:text-2xl text-white rounded-full bg-[rgb(19,58,82)] w-[260px] hover:bg-[rgb(29,78,112)] transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            Explore More
                            <ArrowRightOutlined className="animate-bounce" />
                        </motion.button>
                    </motion.div>
                </motion.div>
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
                    <motion.p
                        variants={fadeInUpVariants}
                        className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto"
                    >
                        Our platform is designed to nurture curiosity, foster creativity, and build the skills needed for the future.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white p-6 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold mb-4 text-[rgb(19,58,82)]">{feature}</h3>
                                <p className="text-gray-600">Tailored to meet the unique needs of every learner, ensuring optimal growth and development.</p>
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
                    <motion.h2
                        variants={fadeInUpVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-8"
                    >
                        Discover Our Key Features
                    </motion.h2>
                    <motion.div
                        variants={fadeInUpVariants}
                        className="text-center mb-12"
                    >
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
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center"
                    >
                        <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300">
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </motion.section>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="homecardsection flex flex-col items-center justify-center gap-20 py-16"
            >
                <motion.div
                    variants={itemVariants}
                    className="topcontent flex flex-col gap-3 w-full max-w-3xl px-4"
                >
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
                            heading: 'Olympiads for You',
                            image: 'homeImg.png',
                            text: 'Explore different opportunities for olympiads across various fields'
                        },
                        {
                            heading: 'Prepare for NePhO',
                            image: 'homeImg.png',
                            text: 'Learn concepts and practice for Nepal Physics Olympiad'
                        },
                        {
                            heading: 'Upcoming Hackathons',
                            image: 'homeImg.png',
                            text: 'Be up-to-date about upcoming hackathon opportunities'
                        },
                        {
                            heading: 'Events that aligns with you',
                            image: 'homeImg.png',
                            text: 'Explore more workshops and events where you can be a part of'
                        }
                    ].map((card, index) => (
                        <motion.div
                            key={card.heading}
                            variants={itemVariants}
                        >
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

