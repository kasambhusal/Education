import React, { useState, useEffect } from 'react';
import { Progress, Card, Row, Col, Typography, List, Tag, Spin, Button } from 'antd';
import { Get } from '../../../../../utils/API';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useUser } from '../../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import NoPracticeData from './NoPracticeData';

const { Title, Text } = Typography;

const Review = () => {
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [correctPercentage, setCorrectPercentage] = useState(0);
    const { user } = useUser();
    const navigate = useNavigate();  // For redirection

    useEffect(() => {
        if (!user?._id) return;

        const fetchReviewData = async () => {
            try {
                const response = await Get({ url: `/users/get/practise-review/${user._id}` });
                setReviewData(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching review data:', error);
                setLoading(false);
            }
        };

        fetchReviewData();
    }, [user._id]);

    useEffect(() => {
        if (reviewData) {
            const correctQuestions = reviewData.attemptedQuestions.filter(q => q.isCorrect).length;
            const percentage = Math.round((correctQuestions / reviewData.totalQuestions) * 100);

            // Animate the progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += 2; // Increment by 2 for smooth animation
                setCorrectPercentage(progress);
                if (progress >= percentage) {
                    clearInterval(interval);
                    setCorrectPercentage(percentage); // Ensure it stops at the exact percentage
                }
            }, 20); // Fast animation

            return () => clearInterval(interval);
        }
    }, [reviewData]);

    if (loading) {
        return <Spin size="large" />;
    }

    if (!reviewData) {
        return <Text>No review data available.</Text>;
    }

    const correctQuestions = reviewData.attemptedQuestions.filter(q => q.isCorrect).length;
    const incorrectQuestions = reviewData.totalQuestions - correctQuestions;

    // Handle the case where there are no questions to review
    if (reviewData.totalQuestions === 0) {
        return (
            <NoPracticeData />
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Your Practice Review</Title>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <Card>
                        <Title level={3}>Overall Performance</Title>
                        <Progress
                            type="dashboard"
                            percent={correctPercentage}
                            strokeColor="#52c41a"
                            format={(percent) => `${percent}% Correct`}
                        />
                        <Text strong>
                            Total Questions: {reviewData.totalQuestions} | Correct: {correctQuestions} |
                            Incorrect: {incorrectQuestions}
                        </Text>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card>
                        <Title level={3}>Question Details</Title>
                        <List
                            dataSource={reviewData.attemptedQuestions}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={item.isCorrect ? (
                                            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px' }} />
                                        ) : (
                                            <CloseCircleOutlined style={{ color: '#f5222d', fontSize: '24px' }} />
                                        )}
                                        title={`Question ID: ${item.questionId}`}
                                        description={
                                            <>
                                                <Text>Course: {item.courseName}</Text>
                                                <br />
                                                <Text>Attempts: {item.attempts}</Text>
                                                <br />
                                                <Tag color={item.isCorrect ? 'success' : 'error'}>
                                                    {item.isCorrect ? 'Correct' : 'Incorrect'}
                                                </Tag>
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Review;
