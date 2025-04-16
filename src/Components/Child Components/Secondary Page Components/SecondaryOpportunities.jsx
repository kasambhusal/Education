"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CompassOutlined,
    TrophyOutlined,
    RocketOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Drawer } from 'antd';
import MainPageOpportunities from "../Others/MainPageOpportunities";
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorageUtils';

const { Sider, Content } = Layout;

const SecondaryOpportunities = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [headText, setHeadText] = useState("");
    const [selectedLabel, setSelectedLabel] = useState('Programs');
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

        const hash = decodeURIComponent(window.location.hash.replace("#", "")).trim();
        const hashLabel = capitalize(hash);
        const storedLabel = getLocalStorage("selectedOpportunity");

        const isValidLabel = menuItems.some((item) => item.label === hashLabel);

        if (hash && isValidLabel) {
            setSelectedLabel(hashLabel);
            setLocalStorage("selectedOpportunity", hashLabel, 300000);
        } else if (storedLabel && menuItems.some((item) => item.label === storedLabel)) {
            setSelectedLabel(storedLabel);
        } else {
            setSelectedLabel("Programs");
        }

        // Set header from URL path
        function getCapitalizedWordFromCurrentURL() {
            const url = window.location.href;
            const lastSegment = url.split('/').filter(Boolean).pop();
            return capitalize(lastSegment);
        }

        setHeadText(getCapitalizedWordFromCurrentURL());
    }, []);



    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [

        {
            key: '1',
            icon: <CompassOutlined />,
            label: 'Programs',
        },
        {
            key: '2',
            icon: <RocketOutlined />,
            label: 'Hackathons',
        },
        {
            key: '3',
            icon: <TrophyOutlined />,
            label: 'Scholarships',
        },
    ];

    const handleMenuClick = ({ key }) => {
        const clickedItem = menuItems.find((item) => item.key === key)
        if (clickedItem) {
            setSelectedLabel(clickedItem.label);
            setLocalStorage("selectedOpportunity", clickedItem.label, 300000)
            if (isMobile) {
                setMobileMenuOpen(false);
            }
        }
    };

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
                        width={260}
                    >
                        <motion.div
                            initial={false}
                            animate={{
                                width: collapsed ? 80 : 260,
                            }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <Menu
                                theme="dark"
                                mode="inline"
                                selectedKeys={[menuItems.find(item => item.label === selectedLabel)?.key || "1"]}
                                items={menuItems}
                                onClick={handleMenuClick}
                                className="border-none mt-5"
                                style={{
                                    background: 'transparent',
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
                        title="Select Opportunity"
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
                            selectedKeys={[menuItems.find(item => item.label === selectedLabel)?.key || "1"]}
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
                    className="my-2 mx-4 py-3 px-6 bg-white rounded-2xl shadow-sm relative overflow-auto"
                    style={{
                        height: 'calc(100vh - 96px)',
                        marginLeft: 0,
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
                            <MainPageOpportunities name={selectedLabel} />
                        </motion.div>
                    </AnimatePresence>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SecondaryOpportunities;
