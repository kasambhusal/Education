"use client"

import React from "react"
import { useState, useContext, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LinkOutlined, MenuOutlined, CloseOutlined, ArrowUpOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

// Context to manage global state across components
const PhysicsOlympiadContext = React.createContext()

const PhysicsOlympiad = () => {
    const [activeSection, setActiveSection] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [showScrollTop, setShowScrollTop] = useState(false)
    const contentRef = useRef(null)

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const sections = contentRef.current.querySelectorAll(".section")
                let currentActiveSection = ""

                // Show scroll-to-top button when scrolled down
                setShowScrollTop(contentRef.current.scrollTop > 300)

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
            // On mobile, add a slight delay to allow the menu to close first
            if (isMobile) {
                setMobileMenuOpen(false)
                setTimeout(() => {
                    contentRef.current.scrollTo({
                        top: section.offsetTop - 70, // Account for the header
                        behavior: "smooth",
                    })
                }, 300)
            } else {
                contentRef.current.scrollTo({
                    top: section.offsetTop - 20,
                    behavior: "smooth",
                })
            }
        }
    }

    const scrollToTop = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
    }

    return (
        <PhysicsOlympiadContext.Provider value={{ activeSection, isMobile }}>
            <div className="flex flex-col h-full relative">
                {/* Mobile header - fixed at the top */}
                {isMobile && (
                    <div className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-indigo-800">Physics Olympiad Guide</h2>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                        </button>
                    </div>
                )}

                {/* Mobile menu - slide in from the right */}
                <AnimatePresence>
                    {isMobile && mobileMenuOpen && (
                        <>
                            {/* Backdrop overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black z-20"
                                onClick={() => setMobileMenuOpen(false)}
                            />

                            {/* Menu panel */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="fixed top-0 right-0 bottom-0 z-30 w-3/4 bg-white shadow-xl pt-16 px-4 overflow-auto"
                            >
                                <div className="pb-20">
                                    <TableOfContents scrollToSection={scrollToSection} />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className={`flex flex-col md:flex-row h-full ${isMobile ? "pt-14" : ""}`}>
                    {/* Desktop table of contents - hidden on mobile */}
                    {!isMobile && <TableOfContents scrollToSection={scrollToSection} />}

                    {/* Main content */}
                    <MainContent contentRef={contentRef} />

                    {/* Scroll to top button - only visible when scrolled down */}
                    <AnimatePresence>
                        {showScrollTop && isMobile && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.2 }}
                                onClick={scrollToTop}
                                className="fixed bottom-6 left-6 z-20 w-[40px] h-[40px] rounded-full bg-indigo-600 text-white shadow-lg"
                                aria-label="Scroll to top"
                            >
                                <ArrowUpOutlined />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PhysicsOlympiadContext.Provider>
    )
}

const TableOfContents = ({ scrollToSection }) => {
    const { activeSection, isMobile } = useContext(PhysicsOlympiadContext)

    const sections = [
        { id: "introduction", title: "Introduction to Physics Olympiad" },
        { id: "nepal-context", title: "Physics Olympiad in Nepal" },
        { id: "structure", title: "Structure and Content" },
        { id: "preparation", title: "Preparation Strategies" },
        { id: "past-achievements", title: "Nepal's Past Achievements" },
        { id: "resources", title: "Resources and Support" },
        { id: "question-bank", title: "Question Bank" },
    ]

    return (
        <motion.div
            className={`${isMobile
                ? "w-full"
                : "md:w-1/4 p-5 bg-white rounded-lg shadow-md mb-10 md:mr-6 md:sticky md:top-5 md:self-start"
                } overflow-auto ${isMobile ? "max-h-full" : "max-h-[calc(100vh-120px)]"}`}
            initial={isMobile ? { opacity: 1 } : { x: -200 }}
            animate={isMobile ? { opacity: 1 } : { x: 0 }}
            transition={{ duration: 0.5 }}
        >
            {!isMobile && <h2 className="text-3xl font-semibold text-indigo-800 mb-5">Physics Olympiad Guide</h2>}
            <ul className="space-y-3">
                {sections.map((section, index) => (
                    <motion.li key={section.id} whileTap={{ scale: 0.98 }}>
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className={`text-left w-full p-3 rounded-lg transition-all ${activeSection === section.id
                                ? "bg-indigo-50 text-indigo-700 font-semibold shadow-sm"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <span
                                className={`inline-block w-7 h-7 mr-2 rounded-full ${activeSection === section.id ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
                                    } text-center leading-7 text-sm font-medium`}
                            >
                                {index + 1}
                            </span>
                            <span className={`${isMobile ? "text-base" : "text-lg"}`}>{section.title}</span>
                        </button>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    )
}

const MainContent = ({ contentRef }) => {
    const { isMobile } = useContext(PhysicsOlympiadContext)

    return (
        <div
            ref={contentRef}
            className={`${isMobile ? "w-full" : "md:w-3/4"} overflow-auto sm:px-4 md:pr-6 ${isMobile ? "max-h-[calc(100vh-56px)]" : "max-h-[calc(100vh-120px)]"
                }`}
        >
            <Section id="introduction" title="1. Introduction to Physics Olympiad">
                <p>
                    The International Physics Olympiad (IPhO) is an annual competition for high school students, aimed at
                    promoting physics education and fostering talented young physicists worldwide. It's one of the International
                    Science Olympiads, challenging students with advanced physics problems that require creative thinking and deep
                    understanding of physical concepts.
                </p>
                <p className="mt-4">Participating in the Physics Olympiad offers students a unique opportunity to:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Challenge themselves with complex physics problems</li>
                    <li>Interact with like-minded peers from around the world</li>
                    <li>Represent their country on an international stage</li>
                    <li>Potentially earn scholarships and recognition</li>
                </ul>
            </Section>

            <Section id="nepal-context" title="2. Physics Olympiad in Nepal">
                <p>
                    In Nepal, the Physics Olympiad holds significant importance in promoting scientific education and identifying
                    talented young physicists. The Nepal Physical Society (NPS) plays a crucial role in organizing the national
                    Physics Olympiad and selecting students to represent Nepal at the International Physics Olympiad.
                </p>
                <p className="mt-4">The competition in Nepal typically follows this process:</p>
                <ol className="list-decimal list-inside mt-2">
                    <li>School-level selection</li>
                    <li>District-level competition</li>
                    <li>National Physics Olympiad</li>
                    <li>Training camp for selected students</li>
                    <li>Final team selection for the International Physics Olympiad</li>
                </ol>
            </Section>

            <Section id="structure" title="3. Structure and Content">
                <p>The Physics Olympiad, both at the national and international levels, typically consists of two parts:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Theoretical examination (usually 5 hours)</li>
                    <li>Experimental examination (usually 5 hours)</li>
                </ul>
                <p className="mt-4">The content covers various areas of physics, including but not limited to:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Mechanics</li>
                    <li>Thermodynamics and molecular physics</li>
                    <li>Oscillations and waves</li>
                    <li>Electric and magnetic fields</li>
                    <li>Quantum physics</li>
                    <li>Relativity</li>
                </ul>
                <p className="mt-4">
                    Problems often require a combination of mathematical skills, physical intuition, and creative problem-solving
                    abilities.
                </p>
            </Section>

            <Section id="preparation" title="4. Preparation Strategies">
                <p>To prepare effectively for the Physics Olympiad, consider the following strategies:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Master fundamental physics concepts thoroughly</li>
                    <li>Practice problem-solving with past Olympiad questions</li>
                    <li>Develop strong mathematical skills, especially calculus</li>
                    <li>Engage in hands-on experiments to improve practical skills</li>
                    <li>Study advanced topics beyond the regular school curriculum</li>
                    <li>Participate in physics clubs or study groups</li>
                    <li>Seek guidance from physics teachers or mentors</li>
                </ul>
                <p className="mt-4">
                    Remember, consistent practice and a deep understanding of physical principles are key to success in the
                    Olympiad.
                </p>
            </Section>

            <Section id="past-achievements" title="5. Nepal's Past Achievements">
                <p>
                    Nepal has been participating in the International Physics Olympiad since [year]. While specific achievements
                    may vary year to year, Nepali students have shown remarkable progress and have occasionally won honorable
                    mentions and medals at the international level.
                </p>
                <p className="mt-4">Some notable achievements include:</p>
                <ul className="list-disc list-inside mt-2">
                    <li> Nepal's first Bronze Medal in 2018</li>
                    <li>Bronze medal at the 54th IPhO</li>
                    <li>Since 2007, Nepal has secured 3 bronze medals and 7 honorable mentions in the IPhO</li>
                </ul>
                <p className="mt-4">
                    These accomplishments highlight the growing strength of physics education in Nepal and serve as inspiration
                    for future participants.
                </p>
            </Section>

            <Section id="resources" title="6. Resources and Support">
                <p>Here are some valuable resources to help you prepare for the Physics Olympiad in Nepal:</p>
                <ul className="list-none mt-2">
                    <li className="mb-4">
                        <a
                            href="https://nps.org.np/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                            Nepal Physical Society <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600">
                            The Nepal Physical Society (NPS) is the official body that organizes and supervises the Physics Olympiad
                            in Nepal. They provide essential support by conducting national training programs, organizing selection
                            exams, and offering guidance to Olympiad participants. They also ensure that Nepal's best physics students
                            get the chance to represent the country at the International Physics Olympiad (IPhO).
                        </p>
                    </li>
                    <li className="mb-4">
                        <a
                            href="https://ipho.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                            International Physics Olympiad <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600">
                            The official website of the International Physics Olympiad (IPhO) provides a wealth of information about
                            the competition, including detailed problem archives, solution sets, and event guidelines. You can access
                            past IPhO problems and solutions that will help you understand the level and format of the exams. This
                            site is also a great resource for understanding the global context of the competition and connecting with
                            international participants.
                        </p>
                    </li>
                    <li className="mb-4">
                        <a
                            href="https://www.ioc.ee/~kalda/ipho/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                            IPhO Preparation Materials <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600">
                            The IPhO Preparation Materials site provides an extensive collection of study materials, including problem
                            sets, practice exams, and theoretical content designed to prepare students for the Olympiad. These
                            resources cover a wide range of topics in physics, from classical mechanics to modern physics. They also
                            provide in-depth solutions, helping you to understand the problem-solving techniques necessary for
                            success.
                        </p>
                    </li>
                </ul>
                <p className="mt-4">
                    In addition to the above online resources, many universities and physics departments in Nepal offer
                    specialized training programs and workshops that are tailored specifically for students preparing for the
                    Physics Olympiad. These programs often include:
                </p>
                <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
                    <li>Intensive coaching sessions covering the core areas of physics.</li>
                    <li>Practice exams and mock tests designed to simulate the real Olympiad experience.</li>
                    <li>Hands-on experimental training to build practical skills.</li>
                    <li>Group study sessions to collaborate with peers and deepen understanding.</li>
                </ul>
                <p className="mt-4">
                    Be sure to check with local educational institutions for information about upcoming training opportunities,
                    and consider joining study groups or mentorship programs to further enhance your preparation. Many of these
                    institutions also offer expert guidance and personal support throughout your journey to the Olympiad.
                </p>
            </Section>
            <Section id="question-bank" title="7. Question Bank">
                <div className="flex justify-center md:justify-start">
                    <Link
                        to="/courses/physics-olympaid-guide/exam-prep"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer text-white font-semibold rounded-lg text-lg inline-flex items-center"
                    >
                        Access Question Bank
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </div>
            </Section>
        </div>
    )
}

const Section = ({ id, title, children }) => {
    const { isMobile } = useContext(PhysicsOlympiadContext)

    return (
        <motion.div
            id={id}
            className={`section bg-white p-5 md:p-6 rounded-xl shadow-lg mb-6 md:mb-8 border border-gray-100`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
        >
            <h3 className={`${isMobile ? "text-xl" : "text-2xl"} font-semibold text-indigo-800 mb-4 flex items-center`}>
                <span className="bg-indigo-100 text-indigo-800 rounded-lg px-3 py-1 mr-3 inline-block">
                    {title.split(".")[0]}.
                </span>
                <span>{title.split(".")[1].trim()}</span>
            </h3>
            <div className={`${isMobile ? "text-base" : "text-lg"} text-gray-700 leading-relaxed`}>{children}</div>
        </motion.div>
    )
}

export default PhysicsOlympiad
