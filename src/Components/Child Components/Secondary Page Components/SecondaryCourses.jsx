"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MenuFoldOutlined, MenuUnfoldOutlined, BookOutlined, TrophyOutlined, RocketOutlined } from "@ant-design/icons"
import { Layout, Menu } from "antd"

const { Header, Sider, Content } = Layout

const courses = [
    {
        id: "1",
        title: "Web Development with React.js",
        description: "Learn to build modern web applications using React.js",
        icon: <RocketOutlined />,
        color: "from-blue-400 to-blue-600",
    },
    {
        id: "2",
        title: "SAT Preparation",
        description: "Comprehensive SAT prep course to boost your scores",
        icon: <BookOutlined />,
        color: "from-green-400 to-green-600",
    },
    {
        id: "3",
        title: "Physics Olympiad",
        description: "Advanced physics training for international competitions",
        icon: <TrophyOutlined />,
        color: "from-purple-400 to-purple-600",
    },
    {
        id: "4",
        title: "Mathematics Olympiad",
        description: "Rigorous math training for aspiring mathematicians",
        icon: <TrophyOutlined />,
        color: "from-red-400 to-red-600",
    },
]

const SecondaryCourses = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)

    const menuItems = [
        {
            key: "courses",
            icon: <BookOutlined />,
            label: "Courses",
            children: courses.map((course) => ({
                key: course.id,
                label: course.title,
            })),
        },
        {
            key: "assignments",
            icon: <RocketOutlined />,
            label: "Assignments",
            children: [
                { key: "pending", label: "Pending" },
                { key: "completed", label: "Completed" },
            ],
        },
    ]

    const handleMenuClick = ({ key }) => {
        const course = courses.find((c) => c.id === key)
        setSelectedCourse(course)
    }

    return (
        <Layout className="min-h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed} width={260}>
                <motion.div
                    initial={false}
                    animate={{
                        width: collapsed ? 80 : 260,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="logo p-4">
                        <h2 className="text-white text-xl font-bold">EduSphere</h2>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} onClick={handleMenuClick} items={menuItems} />
                </motion.div>
            </Sider>
            <Layout>
                <Header className="bg-white p-0 flex items-center justify-between">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-4 text-xl"
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </motion.button>
                    <h1 className="text-2xl font-bold mr-4">Secondary Courses</h1>
                </Header>
                <Content className="m-6 p-6 bg-white rounded-lg min-h-[280px]">
                    <AnimatePresence mode="wait">
                        {selectedCourse ? (
                            <CourseDetail key={selectedCourse.id} course={selectedCourse} />
                        ) : (
                            <CourseGrid courses={courses} />
                        )}
                    </AnimatePresence>
                </Content>
            </Layout>
        </Layout>
    )
}

const CourseGrid = ({ courses }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
        {courses.map((course) => (
            <motion.div
                key={course.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-lg shadow-lg bg-gradient-to-r ${course.color} text-white`}
            >
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p>{course.description}</p>
                <motion.a
                    href={`/courses/${course.id}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-4 inline-block bg-white text-blue-600 px-4 py-2 rounded-full font-semibold"
                >
                    Explore Course
                </motion.a>
            </motion.div>
        ))}
    </motion.div>
)

const CourseDetail = ({ course }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
    >
        <h2 className="text-3xl font-bold">{course.title}</h2>
        <p className="text-xl">{course.description}</p>
        <h3 className="text-2xl font-semibold">Course Content</h3>
        <ul className="list-disc pl-6 space-y-2">
            <li>Introduction to the course</li>
            <li>Core concepts and fundamentals</li>
            <li>Practical exercises and projects</li>
            <li>Advanced topics and techniques</li>
            <li>Final project and assessment</li>
        </ul>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg"
        >
            Enroll Now
        </motion.button>
    </motion.div>
)

export default SecondaryCourses

