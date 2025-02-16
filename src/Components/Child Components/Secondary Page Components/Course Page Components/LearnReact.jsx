"use client"

import React, { useState, useContext, useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Context to manage global state across components
const AppContext = React.createContext()

const LearnReact = () => {
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
        <AppContext.Provider value={{ appName: "React Masterclass", activeSection }}>
            <div className="flex flex-col md:flex-row h-full">
                <TableOfContents scrollToSection={scrollToSection} />
                <MainContent contentRef={contentRef} />
            </div>
        </AppContext.Provider>
    )
}

const TableOfContents = ({ scrollToSection }) => {
    const { activeSection } = useContext(AppContext)

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
    ]

    return (
        <motion.div
            className="md:w-1/4 p-4 bg-white rounded-lg shadow-md mb-10 md:mr-6 md:sticky md:top-5 md:self-start overflow-auto max-h-[calc(100vh-120px)]"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-semibold text-blue-800 mb-5">React Guide</h2>
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
        <div ref={contentRef} className="md:w-3/4 overflow-auto pr-4 max-h-[calc(100vh-50px)]">
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
        </div>
    )
}

const Section = ({ title, children }) => {
    return (
        <motion.div
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

const CodeSnippet = ({ code }) => {
    return <pre className="bg-gray-900 text-white p-4 rounded-lg font-mono overflow-x-auto">{code}</pre>
}

export default LearnReact

