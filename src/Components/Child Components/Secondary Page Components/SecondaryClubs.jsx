import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CompassOutlined,
    TrophyOutlined,
    RocketOutlined,
    ExperimentOutlined,
    BookOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import MainPageClubs from "../Others/MainPageClubs";
import { useTheme } from '../../Context/ThemeContext';

const { Header, Sider, Content } = Layout;

const SecondaryClubs = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [headText, setHeadText] = useState("");
    const { themeColor } = useTheme();
    const [selectedLabel, setSelectedLabel] = useState('Physics Club');

    useEffect(() => {
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
            label: 'Physics Club',
        },
        {
            key: '2',
            icon: <RocketOutlined />,
            label: 'Math Club',
        },
        {
            key: '3',
            icon: <CompassOutlined />,
            label: 'Computer Club',
        },
        {
            key: '4',
            icon: <ExperimentOutlined />,
            label: 'Chemistry Club',
        },
        {
            key: '5',
            icon: <BookOutlined />,
            label: 'Literature Club',
        },
        {
            key: '6',
            icon: <GlobalOutlined />,
            label: 'Geography Club',
        },
    ];

    const handleMenuClick = ({ key }) => {
        const clickedItem = menuItems.find(item => item.key === key);
        if (clickedItem) {
            setSelectedLabel(clickedItem.label);
        }
    };

    return (
        <Layout className="min-h-screen max-h-screen overflow-hidden">
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
                    <div className="p-4 text-white text-xl font-bold border-b border-blue-400/30">
                        {!collapsed && 'Navigation'}
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={menuItems}
                        onClick={handleMenuClick}
                        className="border-none"
                        style={{
                            background: 'transparent',
                        }}
                    />
                </motion.div>
            </Sider>
            <Layout>
                <Header
                    className="p-0 flex items-center justify-between"
                    style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                    }}
                >
                    <div className="flex items-center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                            className="hover:bg-blue-50"
                        />
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text"
                        >
                            {headText}
                        </motion.h1>
                    </div>
                    <div className="px-6">
                        <input
                            type="search"
                            placeholder="Search clubs..."
                            className="px-4 h-[40px] rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 w-64 transition-all duration-300"
                        />
                    </div>
                </Header>
                <Content
                    className="m-6 p-6 bg-white rounded-2xl shadow-sm relative overflow-auto"
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
                            <MainPageClubs name={selectedLabel} />
                        </motion.div>
                    </AnimatePresence>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SecondaryClubs;
