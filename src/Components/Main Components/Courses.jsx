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
import { useTheme } from '../Context/ThemeContext';



const Courses = () => {

    const { Header, Sider, Content } = Layout;


    const [collapsed, setCollapsed] = useState(false);
    const [headText, setHeadText] = useState("");
    const { themeColor } = useTheme();
    const [selectedLabel, setSelectedLabel] = useState('Competitions');

    useEffect(() => {
        function getCapitalizedWordFromCurrentURL() {
            const url = window.location.href;
            const lastSegment = url.split('/').filter(Boolean).pop();
            return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
        }
        setHeadText(getCapitalizedWordFromCurrentURL());
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: 'smooth' });
    }, []);

    const menuItems = [
        {
            key: '1',
            icon: <TrophyOutlined />,
            label: 'Web-Development with React.js',
        },
    ];
    const ourCourses = [
        {
            id: '1',
            head: "What is a website ?",
            content: "In this lesson, we will go throughly to introduce what a website is, how it is accessed from your browser and how everything is working seamlessly to bring the information of entire world in palm of your hands."
        }
    ]

    const handleMenuClick = ({ key }) => {
        const clickedItem = menuItems.find(item => item.key === key);
        if (clickedItem) {
            setSelectedLabel(clickedItem.label);
        }
    };

    return (
        <div>
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
                            {!collapsed && 'Courses'}
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

                    </Header>
                    <Content
                        className="m-6 p-6 rounded-2xl shadow-sm relative overflow-auto"
                        style={{
                            height: 'calc(100vh - 96px)',
                        }}
                    >
                        <div className="Units w-full">
                            {ourCourses.map((item) => {
                                return (
                                    <div key={item.id} className='w-[80%] px-10 pb-8 gap-2 hover:shadow-lg hover:shadow-blue-400 flex flex-col bg-whitee border border-slate-300 rounded-lg hover:scale-[1.02] cursor-pointer bg-gradient-to-b from-white to-blue-200 transition-all duration-200'>
                                        <div className='flex flex-col gap-2'>
                                            <div className="unitName font-bold bg-purple-300 ml-[-40px] px-5 py-2 rounded-r-lg w-[15%] text-blue-600">Chapter - {item.id}</div>
                                            <div className='font-semibold text-white bg-blue-400 px-3 py-2 text-2xl rounded-r-xl w-[35%] hover:scale-[1.02] '>{item.head}</div>
                                        </div>
                                        <div className="content px-10 py-4 text-md font-medium text-slate-600">{item.content}</div>

                                    </div>
                                )
                            })}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Courses
