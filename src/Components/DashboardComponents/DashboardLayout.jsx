import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BookOutlined, FormOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../Context/UserContext';
import PleaseLogin from '../Child Components/Others/PleaseLogin';
import AccessRestricted from '../Child Components/Others/AccessRestricted';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorageUtils';
import PageDashboard from './PageDashboard';
import Greeting from '../Child Components/Others/Gretting';

const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
    const { token, user } = useUser();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('add-course');

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: 'smooth' });
        const storedKey = getLocalStorage("selectedDashboardItem");
        if (storedKey) {
            setSelectedKey(storedKey);
            navigate(`/dashboard/${storedKey}`);
        }
    }, [navigate]);

    if (!token) {
        return <PleaseLogin />;
    } else if (!user?.role === "ADMIN") {
        return <AccessRestricted />;
    }

    const menuItems = [
        {
            key: "courses",
            icon: <BookOutlined />,
            label: "Course",
            children: [
                { key: "add-course", icon: <PlusOutlined />, label: "Add Course" },
                { key: "add-mcq", icon: <FormOutlined />, label: "Add MCQ" },
                { key: "delete-mcq", icon: <DeleteOutlined />, label: "Delete MCQ" },
            ],
        },
    ];

    const handleMenuClick = ({ key }) => {
        setSelectedKey(key);
        setLocalStorage("selectedDashboardItem", key, 300000);
        navigate(`/dashboard/${key}`);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
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
                    className="max-h-full"
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        defaultOpenKeys={['courses']}
                        items={menuItems}
                        onClick={handleMenuClick}
                        className="border-none mt-5"
                        style={{ background: 'transparent' }}
                    />
                </motion.div>
            </Sider>
            <Layout>
                <Header className="header flex justify-between items-center">
                    <h1 style={{ color: 'white' }}>EduSphere Dashboard</h1>
                    <div className='h-[80%]'>

                        <Greeting name={user.fullname} />
                    </div>
                </Header>
                <Content
                    className="my-2 mx-4 py-3 px-6 bg-white rounded-2xl shadow-sm relative overflow-auto"
                    style={{ height: 'calc(100vh - 96px)' }}
                >
                    <AnimatePresence mode="wait">
                        <PageDashboard />
                    </AnimatePresence>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
