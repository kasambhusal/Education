"use client"

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CodeOutlined,
    RocketOutlined,
    BookOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    BarChartOutlined,
    AimOutlined
} from '@ant-design/icons'
import { Layout, Menu, theme, Drawer } from 'antd'
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorageUtils'
import courseData from "../../../utils/JSON/courses.json"
import PageCourse from './Course Page Components/PageCourse'

const { Sider, Content } = Layout

const iconMap = {
    CodeOutlined: <CodeOutlined />,
    BookOutlined: <BookOutlined />,
    TrophyOutlined: <TrophyOutlined />,
}

const SecondaryCourses = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState('Competitions')
    const [isMobile, setIsMobile] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        const interval = setInterval(() => {
            const storedLabel = getLocalStorage("selectedCourse")
            setSelectedLabel(storedLabel || "courses")
        }, 5000) // Runs every 5 seconds

        return () => clearInterval(interval) // Cleanup interval on unmount
    }, [])

    const menuItems = [
        {
            key: "courses",
            icon: <BookOutlined />,
            label: "Courses",
            children: courseData.map((course) => ({
                key: course.id,
                icon: iconMap[course.icon],
                label: course.title,
                url: course.url, // Store URL in menu item
            })),
        },
        {
            key: "assignments",
            icon: <RocketOutlined />,
            label: "Assignments",
            children: [
                { key: "pending", icon: <ClockCircleOutlined />, label: "Pending", url: "/menu/courses/assignment/pending" },
                { key: "completed", icon: <CheckCircleOutlined />, label: "Completed", url: "/menu/courses/assignment/completed" },
            ],
        },
        {
            key: "practise",
            icon: <AimOutlined />,
            label: "Practise",
            children: [
                { key: "review", icon: <BarChartOutlined />, label: "Review", url: "/menu/courses/practise/review" },
            ],
        },
    ]

    const handleMenuClick = ({ key, keyPath }) => {
        const isCourse = keyPath.includes("courses")
        const isAssignment = keyPath.includes("assignments")
        const isPractise = keyPath.includes("practise")

        if (isCourse) {
            const selectedCourse = courseData.find(course => course.id === key)
            if (selectedCourse) {
                navigate(selectedCourse.url) // Navigate to course page
                setSelectedLabel(key)
                setLocalStorage("selectedCourse", key, 300000)
            }
        }
        else if (isAssignment) {
            const selectedAssignment = menuItems.find(item => item.key === "assignments")
                ?.children.find(child => child.key === key)
            if (selectedAssignment) {
                navigate(selectedAssignment.url) // Navigate to assignment page
                setSelectedLabel(key)
                setLocalStorage("selectedCourse", key, 300000)
            }
        }
        else if (isPractise) {
            const selectedPractise = menuItems.find(item => item.key === "practise")
                ?.children.find(child => child.key === key)
            if (selectedPractise) {
                navigate(selectedPractise.url) // Navigate to assignment page
                setSelectedLabel(key)
                setLocalStorage("selectedCourse", key, 300000)
            }
        }
        else {
            setSelectedLabel(key)
            setLocalStorage("selectedCourse", key, 300000)
        }

        // Close mobile menu after selection
        if (isMobile) {
            setMobileMenuOpen(false)
        }
    }

    // Mobile menu button
    const renderMobileMenuButton = () => {
        return (
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(true)}
                className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white md:hidden"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </motion.button>
        )
    }

    return (
        <Layout className="min-h-screen max-h-screen overflow-hidden">
            {/* Original desktop sidebar - only show on non-mobile */}
            {!isMobile && (
                <>
                    <div
                        className="fixed top-1/2 left-0 -translate-y-1/2 z-50"
                        style={{
                            transform: collapsed ? "translateX(80px)" : "translateX(260px)",
                            transition: "transform 0.2s ease-in-out",
                        }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer border border-gray-200"
                        >
                            <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.2 }}>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </motion.div>
                        </motion.button>
                    </div>

                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        className="relative"
                        style={{
                            background: 'linear-gradient(180deg, rgba(30,64,175,1) 0%, rgba(29,78,216,1) 100%)',
                        }}
                        width={260}
                    >
                        <motion.div
                            initial={false}
                            animate={{ width: collapsed ? 80 : 260 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <Menu
                                theme="dark"
                                mode="inline"
                                selectedKeys={[selectedLabel]}
                                items={menuItems}
                                onClick={handleMenuClick}
                                className="border-none mt-5"
                                style={{ background: 'transparent' }}
                            />
                        </motion.div>
                    </Sider>
                </>
            )}

            {/* Mobile menu button and drawer */}
            {isMobile && (
                <>
                    {renderMobileMenuButton()}

                    <Drawer
                        placement="bottom"
                        onClose={() => setMobileMenuOpen(false)}
                        open={mobileMenuOpen}
                        height="auto"
                        title="Course Navigation"
                        styles={{
                            body: {
                                padding: 0,
                                background: "linear-gradient(180deg, rgba(30,64,175,1) 0%, rgba(29,78,216,1) 100%)",
                                maxHeight: "70vh",
                                overflowY: "auto"
                            },
                        }}
                    >
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={[selectedLabel]}
                            defaultOpenKeys={["courses", "assignments", "practise"]} // Open all categories by default on mobile
                            items={menuItems}
                            onClick={handleMenuClick}
                            className="border-none"
                            style={{
                                background: "transparent",
                            }}
                        />
                    </Drawer>
                </>
            )}

            <Layout>
                <Content
                    className="my-2 mx-2 md:mx-4 py-3 px-3 md:px-6 bg-white rounded-2xl shadow-sm relative overflow-auto hide-scrollbar"
                    style={{
                        height: 'calc(100vh - 96px)',
                        marginLeft: 0,
                        transition: "margin-left 0.2s ease-in-out",
                    }}
                >
                    <AnimatePresence mode="wait">
                        <PageCourse />
                    </AnimatePresence>
                </Content>
            </Layout>
        </Layout>
    )
}

export default SecondaryCourses
