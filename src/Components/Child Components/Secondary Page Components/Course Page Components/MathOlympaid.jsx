"use client"

import React, { useState, useContext, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { LinkOutlined } from '@ant-design/icons';


// Context to manage global state across components
const MathOlympiadContext = React.createContext()

const MathOlympiad = () => {
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
        <MathOlympiadContext.Provider value={{ activeSection }}>
            <div className="flex flex-col md:flex-row h-full">
                <TableOfContents scrollToSection={scrollToSection} />
                <MainContent contentRef={contentRef} />
            </div>
        </MathOlympiadContext.Provider>
    )
}

const TableOfContents = ({ scrollToSection }) => {
    const { activeSection } = useContext(MathOlympiadContext)

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
            className="md:w-1/4 p-4 bg-white rounded-lg shadow-md mb-10 md:mr-6 md:sticky md:top-5 md:self-start overflow-auto max-h-[calc(100vh-120px)]"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-semibold text-purple-800 mb-5">Math Olympiad Guide</h2>
            <ul className="space-y-3 text-lg">
                {sections.map((section, index) => (
                    <li key={section.id}>
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className={`text-left w-full p-2 rounded ${activeSection === section.id ? "text-purple-600 font-semibold" : "text-gray-600 hover:text-purple-600"
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
                <ul className="list-none mt-2">
                    <li className="mb-2">
                        <a
                            href="https://www.nms.org.np/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 flex items-center"
                        >
                            Nepal Mathematical Society <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600">Official organization for Math Olympiad in Nepal</p>
                    </li>
                    <li className="mb-2">
                        <a
                            href="https://www.imo-official.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 flex items-center"
                        >
                            International Mathematical Olympiad <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600">Official IMO website with problem archives</p>
                    </li>
                    <li>
                        <a
                            href="https://artofproblemsolving.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 flex items-center"
                        >
                            Art of Problem Solving <LinkOutlined className="h-5 w-5 ml-1" />
                        </a>
                        <p className="text-sm text-gray-600">Comprehensive resources for olympiad preparation</p>
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
    return (
        <motion.div
            id={id}
            className="section bg-white p-6 rounded-lg shadow-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl font-semibold text-purple-800 mb-3">{title}</h3>
            <div className="text-lg text-gray-700">{children}</div>
        </motion.div>
    )
}

export default MathOlympiad

