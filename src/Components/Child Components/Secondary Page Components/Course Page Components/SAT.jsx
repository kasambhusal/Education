"use client"

import React from "react"
import { useState, useContext, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LinkOutlined, MenuOutlined, CloseOutlined, ArrowUpOutlined } from "@ant-design/icons"

// Context to manage global state across components
const SATContext = React.createContext()

const SAT = () => {
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
    <SATContext.Provider value={{ activeSection, isMobile }}>
      <div className="flex flex-col h-full relative">
        {/* Mobile header - fixed at the top */}
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-800">SAT Guide</h2>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
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
                className="fixed bottom-6 right-6 z-20 p-3 rounded-full bg-blue-600 text-white shadow-lg"
                aria-label="Scroll to top"
              >
                <ArrowUpOutlined />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SATContext.Provider>
  )
}

const TableOfContents = ({ scrollToSection }) => {
  const { activeSection, isMobile } = useContext(SATContext)

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
      className={`${
        isMobile
          ? "w-full"
          : "md:w-1/4 p-5 bg-white rounded-lg shadow-md mb-10 md:mr-6 md:sticky md:top-5 md:self-start"
      } overflow-auto ${isMobile ? "max-h-full" : "max-h-[calc(100vh-120px)]"}`}
      initial={isMobile ? { opacity: 1 } : { x: -200 }}
      animate={isMobile ? { opacity: 1 } : { x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isMobile && <h2 className="text-3xl font-semibold text-blue-800 mb-5">SAT Guide</h2>}
      <ul className="space-y-3">
        {sections.map((section, index) => (
          <motion.li key={section.id} whileTap={{ scale: 0.98 }}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={`text-left w-full p-3 rounded-lg transition-all ${
                activeSection === section.id
                  ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span
                className={`inline-block w-7 h-7 mr-2 rounded-full ${
                  activeSection === section.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
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
  const { isMobile } = useContext(SATContext)

  return (
    <div
      ref={contentRef}
      className={`${isMobile ? "w-full" : "md:w-3/4"} overflow-auto px-4 md:pr-6 ${
        isMobile ? "max-h-[calc(100vh-56px)]" : "max-h-[calc(100vh-120px)]"
      }`}
    >
      <Section id="introduction" title="1. Introduction to SAT">
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

      <Section id="structure" title="2. SAT Structure and Content">
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

      <Section id="dsat" title="3. Digital SAT (DSAT)">
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

      <Section id="adaptive" title="4. Adaptive Nature of DSAT">
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

      <Section id="preparation" title="5. Preparation Strategies">
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

      <Section id="resources" title="6. Official Resources">
        <p className="text-lg font-semibold">
          Here are some official resources to help you prepare effectively for the SAT:
        </p>
        <ul className="list-none mt-4 space-y-4">
          <li className="mb-4">
            <a
              href="https://www.collegeboard.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center text-lg font-medium"
            >
              College Board <LinkOutlined className="h-6 w-6 ml-2" />
            </a>
            <p className="text-base text-gray-700 mt-1">
              The official SAT website for test registration, detailed information about the exam structure, important
              dates, and official practice resources.
            </p>
          </li>
          <li className="mb-4">
            <a
              href="https://satsuite.collegeboard.org/digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center text-lg font-medium"
            >
              Digital SAT Information <LinkOutlined className="h-6 w-6 ml-2" />
            </a>
            <p className="text-base text-gray-700 mt-1">
              A comprehensive guide to the Digital SAT, including format changes, adaptive testing features, and
              official practice questions.
            </p>
          </li>
          <li>
            <a
              href="https://www.khanacademy.org/sat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center text-lg font-medium"
            >
              Khan Academy SAT Prep <LinkOutlined className="h-6 w-6 ml-2" />
            </a>
            <p className="text-base text-gray-700 mt-1">
              A free, comprehensive SAT preparation platform with personalized study plans, interactive lessons, and
              full-length practice tests directly linked to College Board.
            </p>
          </li>
        </ul>
      </Section>
      <div className="h-[40%]"></div>
    </div>
  )
}

const Section = ({ id, title, children }) => {
  const { isMobile } = useContext(SATContext)

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
      <h3 className={`${isMobile ? "text-xl" : "text-2xl"} font-semibold text-blue-800 mb-4 flex items-center`}>
        <span className="bg-blue-100 text-blue-800 rounded-lg px-3 py-1 mr-3 inline-block">{title.split(".")[0]}.</span>
        <span>{title.split(".")[1].trim()}</span>
      </h3>
      <div className={`${isMobile ? "text-base" : "text-lg"} text-gray-700 leading-relaxed`}>{children}</div>
    </motion.div>
  )
}

export default SAT
