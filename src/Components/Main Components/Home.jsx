import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
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

export default function Home() {
    const [learnerCount, setLearnerCount] = useState(0)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

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

        return () => clearInterval(timer)
    }, [])

    const particlesInit = async (main) => {
        await loadFull(main)
    }

    const particlesOptions = {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" }
        }
    }

    return (
        <div className="overflow-x-hidden">
            <motion.div className="progress-bar" style={{ scaleX }} />
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesOptions}
                className="absolute inset-0 pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex w-screen px-5 py-8 bg-gradient-to-b from-[rgba(229,244,255,0.8)] to-[rgba(185,229,255,0.8)] md:h-[70vh] relative'
            >
                <Tilt className="imageDiv ml-28 flex-[1] h-full" perspective={500}>
                    <motion.img
                        src="/homeImg.png"
                        alt="Main Image"
                        className='w-[500px] hover:scale-105 transition-transform duration-300'
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                </Tilt>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="homerightcontent flex-[1] flex flex-col gap-6"
                >
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="heading text-[rgb(59,66,108)] font-bold text-6xl w-[70%]"
                    >
                        Learn, Explore, and Empower
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="middle text-lg w-[70%]"
                    >
                        Committed to creating equal and accessible opportunities for students everywhere.
                    </motion.p>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-[rgb(18,23,93)] font-bold"
                    >
                        {learnerCount.toLocaleString()}+ learners
                    </motion.h2>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className='w-full flex justify-center'
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="explore px-4 py-3 font-bold text-2xl text-white rounded-full bg-[rgb(19,58,82)] w-[260px] hover:bg-[rgb(29,78,112)] transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            Explore More
                            <ArrowRightOutlined className="animate-bounce" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>

            <FloatingBar />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="homecardsection flex flex-col items-center justify-center gap-20 mt-8 mb-16"
            >
                <motion.div
                    variants={itemVariants}
                    className="topcontent flex flex-col gap-3 w-[500px]"
                >
                    <p className="toptextheading text-3xl font-bold text-center w-full">
                        Unlock Your Potential for a Changing World
                    </p>
                    <p className="toptext w-full text-center text-gray-600">
                        Equipping you with skills and opportunities to thrive in the ever-evolving modern world.
                    </p>
                </motion.div>
                <div className="cardgrid grid grid-cols-2 gap-x-20 gap-y-28">
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
