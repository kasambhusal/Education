import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import MainBarPage from "../Others/MainBarPage";
import { useTheme } from '../../Context/ThemeContext';

const { Header, Sider, Content } = Layout;

const Secondary = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { themeColor } = useTheme()
    const [selectedLabel, setSelectedLabel] = useState('nav 1'); // Default label
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
        },
    ];

    const handleMenuClick = ({ key }) => {
        const clickedItem = menuItems.find(item => item.key === key);
        if (clickedItem) {
            setSelectedLabel(clickedItem.label);
        }
    };

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    height: '100vh', // Set the height
                    display: 'flex',
                    flexDirection: 'column', // Ensure children stack vertically
                    justifyContent: 'flex-start', // Align items to start
                    backgroundColor: themeColor
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{ backgroundColor: themeColor }}
                />
            </Sider>
            <Layout className='h-screen'>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <MainBarPage name={selectedLabel} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Secondary;
