"use client"

import React from "react"
import { useState, useContext, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { MenuOutlined, CloseOutlined, ArrowUpOutlined, BackwardOutlined } from "@ant-design/icons"

// Context to manage global state across components
const AppContext = React.createContext()

const LearnReact = () => {
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
        <AppContext.Provider value={{ appName: "React Masterclass", activeSection, isMobile }}>
            <div className="flex flex-col h-full relative">
                {/* Mobile header - fixed at the top */}
                {isMobile && (
                    <div className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-blue-800">
                            <Link to="/menu/courses"> <BackwardOutlined className="mx-2 " /></Link>React Guide</h2>
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
                                className="fixed bottom-6 left-6 z-20 w-[40px] h-[40px] rounded-full bg-indigo-600 text-white shadow-lg"
                                aria-label="Scroll to top"
                            >
                                <ArrowUpOutlined />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AppContext.Provider>
    )
}

const TableOfContents = ({ scrollToSection }) => {
    const { activeSection, isMobile } = useContext(AppContext)

    const sections = [
        { id: "introduction", title: "Introduction to React" },
        { id: "jsx", title: "Understanding JSX" },
        { id: "components", title: "Working with Components" },
        { id: "props", title: "Props and State" },
        { id: "hooks", title: "React Hooks" },
        { id: "context", title: "React Context API" },
        { id: "state", title: "State Management" },
        { id: "routing", title: "React Router" },
        { id: "buildingApp", title: "Building a Simple React App" },
        { id: "practisewithedusphere", title: "Practise with EduSphere" },
    ]

    return (
        <motion.div
            className={`${isMobile
                ? "w-full"
                : "md:w-1/4 p-5 bg-white rounded-lg shadow-md mb-10 md:mr-6 md:sticky md:top-5 md:self-start"
                } overflow-auto ${isMobile ? "max-h-full" : "max-h-[calc(100vh-50px)]"}`}
            initial={isMobile ? { opacity: 1 } : { x: -200 }}
            animate={isMobile ? { opacity: 1 } : { x: 0 }}
            transition={{ duration: 0.5 }}
        >
            {!isMobile && <h2 className="text-3xl font-semibold text-blue-800 mb-5">React Guide</h2>}
            <ul className="space-y-3">
                {sections.map((section, index) => (
                    <motion.li key={section.id} whileTap={{ scale: 0.98 }}>
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className={`text-left w-full p-3 rounded-lg transition-all ${activeSection === section.id
                                ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <span
                                className={`inline-block w-7 h-7 mr-2 rounded-full ${activeSection === section.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
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
    const { isMobile } = useContext(AppContext)

    return (
        <div
            ref={contentRef}
            className={`${isMobile ? "w-full" : "md:w-3/4"} overflow-auto px-4 md:pr-6 ${isMobile ? "max-h-[calc(100vh-56px)]" : "max-h-[calc(100vh-50px)]"
                }`}
        >
            <div id="introduction" className="section">
                <Section title="1. Introduction to React">
                    <p>
                        React.js is a JavaScript library used for building user interfaces. It's maintained by Facebook and has
                        gained immense popularity for its simplicity and flexibility. React allows developers to create reusable UI
                        components and build dynamic single-page applications (SPAs).
                    </p>
                    <p className="mt-4">Key features of React include:</p>
                    <ul className="list-disc list-inside mt-2">
                        <li>Virtual DOM for efficient updates</li>
                        <li>Component-based architecture</li>
                        <li>Unidirectional data flow</li>
                        <li>JSX syntax for describing UI</li>
                        <li>Rich ecosystem and community support</li>
                    </ul>
                </Section>
            </div>

            <div id="jsx" className="section">
                <Section title="2. Understanding JSX">
                    <p>
                        JSX stands for JavaScript XML. It allows us to write HTML-like syntax in our JavaScript code. JSX makes
                        React components easier to define, as the structure of HTML and JavaScript is combined. React transforms JSX
                        into JavaScript function calls under the hood.
                    </p>
                    <CodeSnippet code={`const element = <h1>Hello, world!</h1>;`} />
                    <p className="mt-4">JSX can include JavaScript expressions within curly braces:</p>
                    <CodeSnippet code={`const name = 'John';\nconst element = <h1>Hello, {name}!</h1>;`} />
                </Section>
            </div>

            <div id="components" className="section">
                <Section title="3. Working with Components">
                    <p>
                        React apps are built using components. Components are like building blocks that define how a part of your UI
                        should look and behave. React components can be functional or class-based, and they allow for reuse
                        throughout the application.
                    </p>
                    <CodeSnippet code={`function MyComponent() {\n  return <h2>Welcome to React!</h2>;\n}`} />
                    <p className="mt-4">Components can be composed to create more complex UIs:</p>
                    <CodeSnippet
                        code={`function App() {\n  return (\n    <div>\n      <Header />\n      <MyComponent />\n      <Footer />\n    </div>\n  );\n}`}
                    />
                </Section>
            </div>

            <div id="props" className="section">
                <Section title="4. Props and State">
                    <p>
                        Props (short for properties) are a way to pass data from parent to child components. They are read-only and
                        help make your components reusable.
                    </p>
                    <CodeSnippet
                        code={`function Greeting(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\n<Greeting name="Alice" />`}
                    />
                    <p className="mt-4">
                        State, on the other hand, is mutable data that can change over time. It's managed within a component and can
                        be updated using the setState method (in class components) or the useState hook (in functional components).
                    </p>
                    <CodeSnippet
                        code={`function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}`}
                    />
                </Section>
            </div>

            <div id="hooks" className="section">
                <Section title="5. React Hooks">
                    <p>
                        React Hooks are functions that let you use state and other React features in function components. They allow
                        functional components to have features that were previously only available in class-based components, such
                        as managing state and handling side effects.
                    </p>
                    <ul className="list-disc list-inside mt-2">
                        <li>
                            <code>useState</code>: Adds state to a function component.
                        </li>
                        <li>
                            <code>useEffect</code>: Performs side effects like fetching data.
                        </li>
                        <li>
                            <code>useContext</code>: Subscribes to React context without introducing nesting.
                        </li>
                        <li>
                            <code>useReducer</code>: Manages complex state logic in functional components.
                        </li>
                    </ul>
                    <CodeSnippet
                        code={`import React, { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = \`You clicked \${count} times\`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n}`}
                    />
                </Section>
            </div>

            <div id="context" className="section">
                <Section title="6. React Context API">
                    <p>
                        The Context API is a tool used to share state across your React application without having to pass props
                        manually at every level. This is particularly useful for managing things like authentication, themes, and
                        global settings.
                    </p>
                    <CodeSnippet
                        code={`const ThemeContext = React.createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Toolbar() {\n  return (\n    <div>\n      <ThemedButton />\n    </div>\n  );\n}\n\nfunction ThemedButton() {\n  const theme = useContext(ThemeContext);\n  return <button style={{ background: theme }}>I am styled by theme context!</button>;\n}`}
                    />
                </Section>
            </div>

            <div id="state" className="section">
                <Section title="7. State Management">
                    <p>
                        React provides two types of state management: local and global. Local state is managed using the{" "}
                        <code>useState</code> hook, whereas global state can be managed using the Context API or third-party
                        libraries like Redux or MobX.
                    </p>
                    <p className="mt-4">
                        For small to medium-sized applications, React's built-in state management tools are often sufficient.
                        However, for larger applications with complex state requirements, you might consider using a dedicated state
                        management library.
                    </p>
                    <CodeSnippet
                        code={`// Local state management\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}\n\n// Global state management with Context\nconst CountContext = React.createContext();\n\nfunction CountProvider({ children }) {\n  const [count, setCount] = useState(0);\n  return (\n    <CountContext.Provider value={{ count, setCount }}>\n      {children}\n    </CountContext.Provider>\n  );\n}`}
                    />
                </Section>
            </div>

            <div id="routing" className="section">
                <Section title="8. React Router">
                    <p>
                        React Router is the standard routing library for React. It enables the creation of single-page web or mobile
                        apps that allows navigation without the page refreshing. React Router uses component structure to call
                        components, which display the appropriate information.
                    </p>
                    <CodeSnippet
                        code={`import { BrowserRouter as Router, Route, Link } from "react-router-dom";\n\nfunction App() {\n  return (\n    <Router>\n      <div>\n        <nav>\n          <ul>\n            <li><Link to="/">Home</Link></li>\n            <li><Link to="/about">About</Link></li>\n            <li><Link to="/users">Users</Link></li>\n          </ul>\n        </nav>\n\n        <Route path="/" exact component={Home} />\n        <Route path="/about" component={About} />\n        <Route path="/users" component={Users} />\n      </div>\n    </Router>\n  );\n}`}
                    />
                </Section>
            </div>

            <div id="buildingApp" className="section">
                <Section title="9. Building a Simple React App">
                    <p>
                        In this section, we will combine everything you've learned so far to build a simple React app that uses
                        state, hooks, and context. By the end, you'll be able to build a small project and manage its state
                        effectively.
                    </p>
                    <p className="mt-4">Let's create a simple todo list application:</p>
                    <CodeSnippet
                        code={`import React, { useState, useContext } from 'react';\n\nconst TodoContext = React.createContext();\n\nfunction TodoProvider({ children }) {\n  const [todos, setTodos] = useState([]);\n  const addTodo = (text) => setTodos([...todos, { text, completed: false }]);\n  const toggleTodo = (index) => {\n    const newTodos = [...todos];\n    newTodos[index].completed = !newTodos[index].completed;\n    setTodos(newTodos);\n  };\n  return (\n    <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>\n      {children}\n    </TodoContext.Provider>\n  );\n}\n\nfunction TodoList() {\n  const { todos, toggleTodo } = useContext(TodoContext);\n  return (\n    <ul>\n      {todos.map((todo, index) => (\n        <li\n          key={index}\n          onClick={() => toggleTodo(index)}\n          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}\n        >\n          {todo.text}\n        </li>\n      ))}\n    </ul>\n  );\n}\n\nfunction AddTodo() {\n  const [text, setText] = useState('');\n  const { addTodo } = useContext(TodoContext);\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!text.trim()) return;\n    addTodo(text);\n    setText('');\n  };\n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        type="text"\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        placeholder="Add todo"\n      />\n      <button type="submit">Add</button>\n    </form>\n  );\n}\n\nfunction App() {\n  return (\n    <TodoProvider>\n      <h1>Todo List</h1>\n      <AddTodo />\n      <TodoList />\n    </TodoProvider>\n  );\n}\n\nexport default App;`}
                    />
                </Section>
            </div>
            <div id="practisewithedusphere" className="section">
                <Section title="10. Practise with EduSphere">
                    <p>
                        EduSphere provides an interactive platform to test and refine your skills in various domains, including
                        <strong> React.js</strong>. By practicing in a structured environment, learners can enhance their
                        problem-solving abilities and deepen their understanding through real-world scenarios.
                    </p>
                    <p>
                        Whether you're mastering <strong>React components</strong> or tackling challenging <strong>MCQs</strong>,
                        EduSphere ensures a seamless and engaging learning experience. Start your journey now!
                    </p>

                    <CodeSnippet
                        code={`import { Link } from "react-router-dom";\n\nfunction PracticeButton() {\n  return (\n    <Link to="/practise/Reactjs" \n      className="text-blue-500 underline hover:text-blue-700">\n      Start Practicing with EduSphere\n    </Link>\n  );\n}`}
                    />

                    <div className="h-[10vh] flex items-center justify-end">
                        <Link
                            to="/practise/Reactjs"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Practise with EduSphere →
                        </Link>
                    </div>
                </Section>
            </div>
        </div>
    )
}

const Section = ({ title, children }) => {
    const { isMobile } = useContext(AppContext)

    return (
        <motion.div
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

const CodeSnippet = ({ code }) => {
    const { isMobile } = useContext(AppContext)

    return (
        <pre
            className={`bg-gray-900 text-white p-3 md:p-4 rounded-lg font-mono overflow-x-auto text-sm md:text-base mt-4 mb-4`}
        >
            {code}
        </pre>
    )
}

export default LearnReact
