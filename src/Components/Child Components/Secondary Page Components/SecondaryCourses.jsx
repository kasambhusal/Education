import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { motion, AnimatePresence } from 'framer-motion';
import {
    RocketOutlined,
    BookOutlined,
    TrophyOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorageUtils';
import courseData from "../../../utils/JSON/courses.json";
import PageCourse from './Course Page Components/PageCourse';

const { Sider, Content } = Layout;

const iconMap = {
    RocketOutlined: <RocketOutlined />,
    BookOutlined: <BookOutlined />,
    TrophyOutlined: <TrophyOutlined />,
};

const SecondaryCourses = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [collapsed, setCollapsed] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('Competitions');

    useEffect(() => {
        const interval = setInterval(() => {
            const storedLabel = getLocalStorage("selectedCourse");
            setSelectedLabel(storedLabel || "courses");
        }, 5000); // Runs every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                { key: "pending", label: "Pending", url: "/courses/pending" },
                { key: "completed", label: "Completed", url: "/courses/completed" },
            ],
        },
    ];

    const handleMenuClick = ({ key, keyPath }) => {
        const isCourse = keyPath.includes("courses");
        const isAssignment = keyPath.includes("assignments");

        if (isCourse) {
            const selectedCourse = courseData.find(course => course.id === key);
            if (selectedCourse) {
                navigate(selectedCourse.url); // Navigate to course page
                setSelectedLabel(key);
                setLocalStorage("selectedCourse", key, 300000);
            }
        } else if (isAssignment) {
            const selectedAssignment = menuItems.find(item => item.key === "assignments")
                ?.children.find(child => child.key === key);
            if (selectedAssignment) {
                navigate(selectedAssignment.url); // Navigate to assignment page
                setSelectedLabel(key);
                setLocalStorage("selectedCourse", key, 300000);
            }
        } else {
            setSelectedLabel(key);
            setLocalStorage("selectedCourse", key, 300000);
        }
    };



    return (
        <Layout className="min-h-screen max-h-screen overflow-hidden">
            {/* Custom sliding button */}
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
            <Layout>
                <Content
                    className="my-2 mx-4 py-3 px-6 bg-white rounded-2xl shadow-sm relative overflow-auto"
                    style={{ height: 'calc(100vh - 96px)' }}
                >
                    <AnimatePresence mode="wait">
                        <PageCourse />
                    </AnimatePresence>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SecondaryCourses;
