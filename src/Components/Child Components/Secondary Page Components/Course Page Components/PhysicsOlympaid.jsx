"use client"

import React, { useState, useContext, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { LinkOutlined } from '@ant-design/icons';

// Context to manage global state across components
const PhysicsOlympiadContext = React.createContext()

const PhysicsOlympiad = () => {
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
        <PhysicsOlympiadContext.Provider value={{ activeSection }}>
            <div className="flex flex-col md:flex-row h-full">
                <TableOfContents scrollToSection={scrollToSection} />
                <MainContent contentRef={contentRef} />
            </div>
        </PhysicsOlympiadContext.Provider>
    )
}

const TableOfContents = ({ scrollToSection }) => {
    const { activeSection } = useContext(PhysicsOlympiadContext)

    const sections = [
        { id: "introduction", title: "Introduction to Physics Olympiad" },
        { id: "nepal-context", title: "Physics Olympiad in Nepal" },
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
            <h2 className="text-3xl font-semibold text-indigo-800 mb-5">Physics Olympiad Guide</h2>
            <ul className="space-y-3 text-lg">
                {sections.map((section, index) => (
                    <li key={section.id}>
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className={`text-left w-full p-2 rounded ${activeSection === section.id ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"
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
            <Section id="introduction" title="Introduction to Physics Olympiad">
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

            <Section id="nepal-context" title="Physics Olympiad in Nepal">
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

            <Section id="structure" title="Structure and Content">
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

            <Section id="preparation" title="Preparation Strategies">
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

            <Section id="past-achievements" title="Nepal's Past Achievements">
                <p>
                    Nepal has been participating in the International Physics Olympiad since [year]. While specific achievements
                    may vary year to year, Nepali students have shown remarkable progress and have occasionally won honorable
                    mentions and medals at the international level.
                </p>
                <p className="mt-4">Some notable achievements include:</p>
                <ul className="list-disc list-inside mt-2">
                    <li>[Achievement 1]</li>
                    <li>[Achievement 2]</li>
                    <li>[Achievement 3]</li>
                </ul>
                <p className="mt-4">
                    These accomplishments highlight the growing strength of physics education in Nepal and serve as inspiration
                    for future participants.
                </p>
            </Section>

            <Section id="resources" title="Resources and Support">
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
                            The Nepal Physical Society (NPS) is the official body that organizes and supervises the Physics Olympiad in Nepal.
                            They provide essential support by conducting national training programs, organizing selection exams, and offering guidance
                            to Olympiad participants. They also ensure that Nepal’s best physics students get the chance to represent the country at
                            the International Physics Olympiad (IPhO).
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
                            The official website of the International Physics Olympiad (IPhO) provides a wealth of information about the competition,
                            including detailed problem archives, solution sets, and event guidelines. You can access past IPhO problems and solutions
                            that will help you understand the level and format of the exams. This site is also a great resource for understanding the
                            global context of the competition and connecting with international participants.
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
                            The IPhO Preparation Materials site provides an extensive collection of study materials, including problem sets, practice
                            exams, and theoretical content designed to prepare students for the Olympiad. These resources cover a wide range of
                            topics in physics, from classical mechanics to modern physics. They also provide in-depth solutions, helping you to
                            understand the problem-solving techniques necessary for success.
                        </p>
                    </li>
                </ul>
                <p className="mt-4">
                    In addition to the above online resources, many universities and physics departments in Nepal offer specialized training
                    programs and workshops that are tailored specifically for students preparing for the Physics Olympiad. These programs often
                    include:
                </p>
                <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
                    <li>Intensive coaching sessions covering the core areas of physics.</li>
                    <li>Practice exams and mock tests designed to simulate the real Olympiad experience.</li>
                    <li>Hands-on experimental training to build practical skills.</li>
                    <li>Group study sessions to collaborate with peers and deepen understanding.</li>
                </ul>
                <p className="mt-4">
                    Be sure to check with local educational institutions for information about upcoming training opportunities, and consider
                    joining study groups or mentorship programs to further enhance your preparation. Many of these institutions also offer expert
                    guidance and personal support throughout your journey to the Olympiad.
                </p>
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
            <h3 className="text-2xl font-semibold text-indigo-800 mb-3">{title}</h3>
            <div className="text-lg text-gray-700">{children}</div>
        </motion.div>
    )
}

export default PhysicsOlympiad

