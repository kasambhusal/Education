import React from 'react';
import { Typography, Button, Empty, Card } from 'antd';
import { BookOutlined, RocketOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import "../../../../../CSS/NoPracticeData.css"

const { Title, Text } = Typography;

const NoPracticeData = () => {
    const navigate = useNavigate();

    return (
        <div className="no-practice-container">
            <Card className="no-practice-card">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{
                        height: 160,
                    }}
                    description={
                        <Title level={2} className="no-practice-title">
                            Your Learning Journey Awaits!
                        </Title>
                    }
                >
                    <Text className="no-practice-text">
                        It looks like you haven't started practicing yet. Embark on your learning adventure by exploring our courses!
                    </Text>
                    <div className="no-practice-actions">
                        <Button
                            type="primary"
                            icon={<RocketOutlined />}
                            size="large"
                            onClick={() => navigate('/menu/courses')}
                            className="start-button"
                        >
                            Start Learning
                        </Button>
                        <Button
                            icon={<BookOutlined />}
                            size="large"
                            onClick={() => navigate('/menu/courses')}
                            className="explore-button"
                        >
                            Explore Courses
                        </Button>
                    </div>
                </Empty>
            </Card>
        </div>
    );
};

export default NoPracticeData;