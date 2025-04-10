"use client"

import React from "react"
import { useState, useContext, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LinkOutlined, MenuOutlined, CloseOutlined, ArrowUpOutlined } from "@ant-design/icons"

// Context to manage global state across components
const MathOlympiadContext = React.createContext()

const MathOlympiad = () => {
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
        <MathOlympiadContext.Provider value={{ activeSection, isMobile }}>
            <div className="flex flex-col h-full relative">
                {/* Mobile header - fixed at the top */}
                {isMobile && (
                    <div className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-indigo-800">Math Olympiad Guide</h2>
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
        </MathOlympiadContext.Provider>
    )
}

const TableOfContents = ({ scrollToSection }) => {
    const { activeSection, isMobile } = useContext(MathOlympiadContext)

    const sections = [
        { id: "introduction", title: "Introduction to Math Olympiad" },
        { id: "nepal-context", title: "Math Olympiad in Nepal" },
        { id: "structure", title: "Structure and Content" },
        { id: "preparation", title: "Preparation Strategies" },
        { id: "past-achievements", title: "Nepal's Past Achievements" },
        { id: "resources", title: "Resources and Support" },
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
            {!isMobile && <h2 className="text-3xl font-semibold text-indigo-800 mb-5">Math Olympiad Guide</h2>}
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
    const { isMobile } = useContext(MathOlympiadContext)

    return (
        <div
            ref={contentRef}
            className={`${isMobile ? "w-full" : "md:w-3/4"} overflow-auto sm:px-4 md:pr-6 ${isMobile ? "max-h-[calc(100vh-56px)]" : "max-h-[calc(100vh-120px)]"
                }`}
        >
            <Section id="introduction" title="1. Introduction to Math Olympiad">
                <p>
                    The International Mathematical Olympiad (IMO) is the world championship mathematics competition for high
                    school students, held annually in a different country. It's one of the most prestigious mathematical
                    competitions globally, challenging participants with complex mathematical problems that require exceptional
                    problem-solving skills and creativity.
                </p>
                <p className="mt-4">Participating in the Math Olympiad offers students numerous benefits, including:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Developing advanced mathematical thinking and problem-solving skills</li>
                    <li>Exposure to challenging mathematical concepts beyond the standard curriculum</li>
                    <li>Opportunities to connect with mathematically gifted peers from around the world</li>
                    <li>Potential for recognition, scholarships, and future academic opportunities</li>
                </ul>
            </Section>

            <Section id="nepal-context" title="2. Math Olympiad in Nepal">
                <p>
                    In Nepal, the Math Olympiad plays a crucial role in identifying and nurturing mathematical talent among young
                    students. The Nepal Mathematical Society (NMS) is responsible for organizing the national Math Olympiad and
                    selecting students to represent Nepal at the International Mathematical Olympiad.
                </p>
                <p className="mt-4">The competition process in Nepal typically involves:</p>
                <ol className="list-decimal list-inside mt-2">
                    <li>School-level selection rounds</li>
                    <li>District and regional competitions</li>
                    <li>National Math Olympiad</li>
                    <li>Intensive training camp for selected students</li>
                    <li>Final team selection for the International Mathematical Olympiad</li>
                </ol>
                <p className="mt-4">
                    The Math Olympiad in Nepal not only serves as a platform for identifying talented mathematicians but also
                    helps in raising the overall standard of mathematics education in the country.
                </p>
            </Section>

            <Section id="structure" title="3. Structure and Content">
                <p>
                    The Math Olympiad, both at the national and international levels, typically consists of a series of
                    challenging mathematical problems. At the IMO, the structure is as follows:
                </p>
                <ul className="list-disc list-inside mt-2">
                    <li>Two exams held on consecutive days</li>
                    <li>Each exam lasts 4.5 hours</li>
                    <li>Three problems per exam, for a total of six problems</li>
                </ul>
                <p className="mt-4">The problems cover various areas of mathematics, including but not limited to:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Algebra</li>
                    <li>Combinatorics</li>
                    <li>Geometry</li>
                    <li>Number Theory</li>
                </ul>
                <p className="mt-4">
                    These problems are designed to test not just knowledge, but also creativity, logical thinking, and
                    problem-solving skills. They often require novel approaches and insights that go beyond standard mathematical
                    techniques taught in schools.
                </p>
            </Section>

            <Section id="preparation" title="4. Preparation Strategies">
                <p>To prepare effectively for the Math Olympiad, consider the following strategies:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Master fundamental mathematical concepts across all relevant areas</li>
                    <li>Practice with past Olympiad questions and similar challenging problems</li>
                    <li>Develop strong problem-solving skills and learn to approach problems creatively</li>
                    <li>Study advanced topics not typically covered in the school curriculum</li>
                    <li>Participate in math clubs, workshops, and online forums</li>
                    <li>Engage in regular practice sessions, simulating exam conditions</li>
                    <li>Seek guidance from experienced mentors or past Olympiad participants</li>
                </ul>
                <p className="mt-4">
                    Remember, success in the Math Olympiad requires not just knowledge, but also the ability to apply that
                    knowledge in novel and creative ways. Regular, focused practice is key to developing these skills.
                </p>
            </Section>

            <Section id="past-achievements" title="5. Nepal's Past Achievements">
                <p>
                    Nepal has been participating in the International Mathematical Olympiad since 1997. While specific
                    achievements may vary year to year, Nepali students have shown remarkable progress and have occasionally won
                    honorable mentions and medals at the international level.
                </p>
                <p className="mt-4">Some notable achievements include:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>Bronze medal at the IMO 2019</li>
                    <li>Multiple Honorable Mentions in recent years</li>
                    <li>Consistent improvement in team rankings over the past decade</li>
                </ul>
                <p className="mt-4">
                    These accomplishments highlight the growing strength of mathematics education in Nepal and serve as
                    inspiration for future participants. They also demonstrate the potential of Nepali students to compete at the
                    highest levels of mathematical competition globally.
                </p>
            </Section>

            <Section id="resources" title="6. Resources and Support">
                <p>Here are some valuable resources for Math Olympiad preparation in Nepal:</p>
                <ul className="list-none mt-4 space-y-4">
                    <li className="mb-2">
                        <a
                            href="https://www.nms.org.np/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 flex items-center text-lg font-medium"
                        >
                            Nepal Mathematical Society <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600 mt-1">Official organization for Math Olympiad in Nepal</p>
                    </li>
                    <li className="mb-2">
                        <a
                            href="https://www.imo-official.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 flex items-center text-lg font-medium"
                        >
                            International Mathematical Olympiad <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600 mt-1">Official IMO website with problem archives</p>
                    </li>
                    <li>
                        <a
                            href="https://artofproblemsolving.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 flex items-center text-lg font-medium"
                        >
                            Art of Problem Solving <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600 mt-1">Comprehensive resources for olympiad preparation</p>
                    </li>
                </ul>
                <p className="mt-4">
                    Additionally, many universities and mathematics departments in Nepal offer training programs and workshops for
                    Math Olympiad preparation. Check with local educational institutions and the Nepal Mathematical Society for
                    more information on these opportunities.
                </p>
            </Section>
            <div className="h-[40%]"></div>
        </div>
    )
}

const Section = ({ id, title, children }) => {
    const { isMobile } = useContext(MathOlympiadContext)

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

export default MathOlympiad
