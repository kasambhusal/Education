"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    TrophyOutlined,
    RocketOutlined,
    CompassOutlined,
    ExperimentOutlined,
    BookOutlined,
    GlobalOutlined,
} from "@ant-design/icons"
import { Layout, Menu, Drawer } from "antd"
import MainPageClubs from "../Others/MainPageClubs"
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorageUtils"

const { Sider, Content } = Layout

const SecondaryClubs = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState("")
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
        const hash = decodeURIComponent(window.location.hash.replace("#", "")).trim()

        const capitalizeFirstLetter = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }

        const hashLabel = capitalizeFirstLetter(hash)
        const storedLabel = getLocalStorage("selectedClub")

        if (hashLabel && menuItems.some((item) => item.label === hashLabel)) {
            setSelectedLabel(hashLabel)
            setLocalStorage("selectedClub", hashLabel, 300000)
        } else if (storedLabel && menuItems.some((item) => item.label === storedLabel)) {
            setSelectedLabel(storedLabel)
        } else {
            setSelectedLabel("Physics Club")
        }
    }, [])



    const handleMenuClick = ({ key }) => {
        const clickedItem = menuItems.find((item) => item.key === key)
        if (clickedItem) {
            setSelectedLabel(clickedItem.label)
            setLocalStorage("selectedClub", clickedItem.label, 300000)
            if (isMobile) {
                setMobileMenuOpen(false)
            }
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
                                selectedKeys={[menuItems.find((item) => item.label === selectedLabel)?.key || "0"]}
                                items={menuItems}
                                onClick={handleMenuClick}
                                className="border-none"
                                style={{
                                    background: "transparent",
                                }}
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
                        title="Select Club"
                        styles={{
                            body: {
                                padding: 0,
                                background: "linear-gradient(180deg, rgba(30,64,175,1) 0%, rgba(29,78,216,1) 100%)",
                            },
                        }}
                    >
                        <Menu
                            theme="dark"
                            mode="vertical"
                            selectedKeys={[menuItems.find((item) => item.label === selectedLabel)?.key || "0"]}
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
                    className="my-2  py-3 px-1 sm:px-6 bg-white rounded-2xl shadow-sm relative overflow-auto"
                    style={{
                        height: "calc(100vh - 48px)",
                        transition: "margin-left 0.2s ease-in-out",
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
