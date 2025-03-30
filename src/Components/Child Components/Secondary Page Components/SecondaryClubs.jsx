import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    TrophyOutlined,
    RocketOutlined,
    CompassOutlined,
    ExperimentOutlined,
    BookOutlined,
    GlobalOutlined,
} from "@ant-design/icons"
import { Layout, Menu } from "antd"
import MainPageClubs from "../Others/MainPageClubs"
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorageUtils"

const { Sider, Content } = Layout

const SecondaryClubs = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState("")

    const menuItems = [
        {
            key: "1",
            icon: <TrophyOutlined />,
            label: "Physics Club",
        },
        {
            key: "2",
            icon: <RocketOutlined />,
            label: "Math Club",
        },
        {
            key: "3",
            icon: <CompassOutlined />,
            label: "Computer Club",
        },
        {
            key: "4",
            icon: <ExperimentOutlined />,
            label: "Chemistry Club",
        },
        {
            key: "5",
            icon: <BookOutlined />,
            label: "Literature Club",
        },
        {
            key: "6",
            icon: <GlobalOutlined />,
            label: "Geography Club",
        },
    ]

    useEffect(() => {
        // Retrieve selected label from localStorage
        const storedLabel = getLocalStorage("selectedClub")
        if (storedLabel) {
            setSelectedLabel(storedLabel); // Set the saved label on page load
        } else {
            setSelectedLabel("Physics Club"); // Default to Physics Club if no label is saved
        }
    }, [])

    const handleMenuClick = ({ key }) => {
        const clickedItem = menuItems.find((item) => item.key === key)
        if (clickedItem) {
            setSelectedLabel(clickedItem.label)
            setLocalStorage("selectedClub", clickedItem.label, 300000)
        }
    }

    return (
        <Layout className="min-h-screen max-h-screen overflow-hidden" >
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
                className="relative shadow-lg"
                style={{
                    background: "linear-gradient(180deg, rgba(30,64,175,1) 0%, rgba(29,78,216,1) 100%)",
                }}
                width={260}
            >
                <motion.div
                    initial={false}
                    animate={{
                        width: collapsed ? 80 : 260,
                    }}
                    transition={{ duration: 0.2 }}
                    className="h-full pt-4"
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[menuItems.find(item => item.label === selectedLabel)?.key || "0"]}
                        items={menuItems}
                        onClick={handleMenuClick}
                        className="border-none"
                        style={{
                            background: "transparent",
                        }}
                    />
                </motion.div>
            </Sider>

            <Layout>
                <Content
                    className="my-2 mx-4 py-3 px-6 bg-white rounded-2xl shadow-sm relative overflow-auto"
                    style={{
                        height: "calc(100vh - 48px)",
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedLabel}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <MainPageClubs name={selectedLabel} />
                        </motion.div>
                    </AnimatePresence>
                </Content>
            </Layout>
        </Layout>
    )
}

export default SecondaryClubs
