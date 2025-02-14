"use client"

import React, { useState, useContext, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { LinkOutlined } from '@ant-design/icons';


// Context to manage global state across components
const SATContext = React.createContext()

const SAT = () => {
    const [activeSection, setActiveSection] = useState("")
    const contentRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const sections = contentRef.current.querySelectorAll(".section")
                let currentActiveSection = ""

                sections.forEach((section) => {
                    const rect = section.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        currentActiveSection = section.id
                    }
                })

                setActiveSection(currentActiveSection)
            }
        }

        const contentElement = contentRef.current
        if (contentElement) {
            contentElement.addEventListener("scroll", handleScroll)
        }

        return () => {
            if (contentElement) {
                contentElement.removeEventListener("scroll", handleScroll)
            }
        }
    }, [])

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section && contentRef.current) {
            contentRef.current.scrollTo({
                top: section.offsetTop - 20,
                behavior: "smooth",
            })
        }
    }

    return (
        <SATContext.Provider value={{ activeSection }}>
            <div className="flex flex-col md:flex-row h-full">
                <TableOfContents scrollToSection={scrollToSection} />
                <MainContent contentRef={contentRef} />
            </div>
        </SATContext.Provider>
    )
}

const TableOfContents = ({ scrollToSection }) => {
    const { activeSection } = useContext(SATContext)

    const sections = [
        { id: "introduction", title: "Introduction to SAT" },
        { id: "structure", title: "SAT Structure and Content" },
        { id: "dsat", title: "Digital SAT (DSAT)" },
        { id: "adaptive", title: "Adaptive Nature of DSAT" },
        { id: "preparation", title: "Preparation Strategies" },
        { id: "resources", title: "Official Resources" },
    ]

    return (
        <motion.div
            className="md:w-1/4 p-4 bg-white rounded-lg shadow-md mb-10 md:mr-6 md:sticky md:top-5 md:self-start overflow-auto max-h-[calc(100vh-120px)]"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-semibold text-blue-800 mb-5">SAT Guide</h2>
            <ul className="space-y-3 text-lg">
                {sections.map((section, index) => (
                    <li key={section.id}>
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className={`text-left w-full p-2 rounded ${activeSection === section.id ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                }`}
                        >
                            {`${index + 1}. ${section.title}`}
                        </button>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}

const MainContent = ({ contentRef }) => {
    return (
        <div ref={contentRef} className="md:w-3/4 overflow-auto pr-4 max-h-[calc(100vh-120px)]">
            <Section id="introduction" title="Introduction to SAT">
                <p>
                    The SAT (Scholastic Assessment Test) is a standardized test widely used for college admissions in the United
                    States. It is designed to assess a student's readiness for college and is typically taken by high school
                    juniors and seniors.
                </p>
                <p className="mt-4">
                    The SAT measures skills in reading, writing, and math—subjects that are taught every day in high school
                    classrooms. Most students take the SAT during their junior or senior year of high school, and almost all
                    colleges and universities use the SAT to make admission decisions.
                </p>
            </Section>

            <Section id="structure" title="SAT Structure and Content">
                <p>The SAT consists of two main sections:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Evidence-Based Reading and Writing</li>
                    <li>Math</li>
                </ul>
                <p className="mt-4">
                    The Evidence-Based Reading and Writing section includes a Reading Test and a Writing and Language Test. The
                    Math section includes questions on algebra, problem-solving, data analysis, and advanced math.
                </p>
                <p className="mt-4">
                    The total testing time is about 3 hours, and the scoring scale ranges from 400 to 1600 points.
                </p>
            </Section>

            <Section id="dsat" title="Digital SAT (DSAT)">
                <p>
                    Starting from March 2023 internationally and March 2024 in the U.S., the College Board introduced the Digital
                    SAT (DSAT). This new format brings several changes to the traditional paper-based test:
                </p>
                <ul className="list-disc list-inside mt-2">
                    <li>The test is taken on a computer or tablet, either at a school or a test center</li>
                    <li>The total test time is reduced to about 2 hours and 14 minutes</li>
                    <li>There are shorter reading passages with one question tied to each</li>
                    <li>Calculators are allowed throughout the entire Math section</li>
                    <li>Scores are returned to students within days, not weeks</li>
                </ul>
            </Section>

            <Section id="adaptive" title="Adaptive Nature of DSAT">
                <p>
                    One of the most significant changes in the Digital SAT is its adaptive nature. The DSAT uses a multistage
                    adaptive testing approach:
                </p>
                <ul className="list-disc list-inside mt-2">
                    <li>The test adjusts to each student's performance level</li>
                    <li>Each section (Math and Reading/Writing) is divided into two modules</li>
                    <li>Performance on the first module determines the difficulty of the second module</li>
                    <li>This allows for a more precise measurement of a student's abilities in a shorter time</li>
                </ul>
                <p className="mt-4">
                    The adaptive nature ensures that students receive questions that are appropriately challenging, providing a
                    more personalized and efficient testing experience.
                </p>
            </Section>

            <Section id="preparation" title="Preparation Strategies">
                <p>To prepare effectively for the SAT or DSAT, consider the following strategies:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Familiarize yourself with the test format and question types</li>
                    <li>Practice with official SAT practice tests</li>
                    <li>Focus on your weak areas</li>
                    <li>Improve your vocabulary and reading comprehension</li>
                    <li>Master fundamental math concepts</li>
                    <li>Learn time management techniques</li>
                    <li>For DSAT, practice using the digital testing platform</li>
                </ul>
            </Section>

            <Section id="resources" title="Official Resources">
                <p>Here are some official resources to help you prepare for the SAT:</p>
                <ul className="list-none mt-2">
                    <li className="mb-2">
                        <a
                            href="https://www.collegeboard.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            College Board <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600">Official SAT website for registration and information</p>
                    </li>
                    <li className="mb-2">
                        <a
                            href="https://satsuite.collegeboard.org/digital"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            Digital SAT Information <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600">Detailed information about the Digital SAT</p>
                    </li>
                    <li>
                        <a
                            href="https://www.khanacademy.org/sat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            Khan Academy SAT Prep <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600">Free, comprehensive SAT preparation</p>
                    </li>
                </ul>
            </Section>
        </div>
    )
}

const Section = ({ id, title, children }) => {
    return (
        <motion.div
            id={id}
            className="section bg-white p-6 rounded-lg shadow-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl font-semibold text-blue-800 mb-3">{title}</h3>
            <div className="text-lg text-gray-700">{children}</div>
        </motion.div>
    )
}

export default SAT

