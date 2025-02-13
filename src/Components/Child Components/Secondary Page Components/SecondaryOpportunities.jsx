import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CompassOutlined,
    TrophyOutlined,
    RocketOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import MainPageOpportunities from "../Others/MainPageOpportunities";
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorageUtils';

const { Header, Sider, Content } = Layout;

const SecondaryOpportunities = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [headText, setHeadText] = useState("");
    const [selectedLabel, setSelectedLabel] = useState('Competitions');

    useEffect(() => {
        const storedLabel = getLocalStorage("selectedOpportunity")
        if (storedLabel) {
            setSelectedLabel(storedLabel); // Set the saved label on page load
        } else {
            setSelectedLabel("Competitions"); // Default label if none is stored
        }

        function getCapitalizedWordFromCurrentURL() {
            const url = window.location.href;
            const lastSegment = url.split('/').filter(Boolean).pop();
            return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
        }
        setHeadText(getCapitalizedWordFromCurrentURL());
    }, []);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        {
            key: '1',
            icon: <TrophyOutlined />,
            label: 'Competitions',
        },
        {
            key: '2',
            icon: <RocketOutlined />,
            label: 'Hackathons',
        },
        {
            key: '3',
            icon: <CompassOutlined />,
            label: 'Workshops',
        },
    ];

    const handleMenuClick = ({ key }) => {
        const clickedItem = menuItems.find((item) => item.key === key)
        if (clickedItem) {
            setSelectedLabel(clickedItem.label);
            setLocalStorage("selectedOpportunity", clickedItem.label, 300000)

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
            <Layout>
                <Content
                    className="my-2 mx-4 py-3 px-6 bg-white rounded-2xl shadow-sm relative overflow-auto"
                    style={{
                        height: 'calc(100vh - 96px)',
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
