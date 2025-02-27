import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Radio, Rate, message } from 'antd';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Get, Post } from '../../utils/API';
import { useUser } from '../Context/UserContext';

const { Option } = Select;

const AddMCQ = () => {
    const [form] = Form.useForm();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { token } = useUser();

    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await Get({
                    url: "/courses",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                });
                setCourses(response.data);
            } catch (error) {
                message.error('Failed to fetch courses');
            }
        };
        fetchCourses();
    }, [token]);

    // Handle form submission
    const onFinish = async (values) => {
        try {
            // Prepare options array and correct answer
            const options = [values.optionA, values.optionB, values.optionC, values.optionD];
            const correctAnswer = values.correct; // The correct answer will be a letter (A, B, C, or D)

            // Construct the MCQ data to send to backend
            const mcqData = {
                question: values.question,
                options,
                correct: correctAnswer,
                complexity: values.complexity,
            };

            // Send the MCQ data to backend
            await Post({
                url: `/courses/${selectedCourse}/mcq`,
                data: mcqData,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            message.success('MCQ added successfully');
            form.resetFields();
        } catch (error) {
            message.error('Failed to add MCQ');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2>Add New MCQ</h2>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="courseId"
                    label="Select Course"
                    rules={[{ required: true, message: 'Please select a course!' }]}
                >
                    <Select onChange={(value) => setSelectedCourse(value)}>
                        {courses && courses.map((course) => (
                            <Option key={course._id} value={course._id}>
                                {course.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="question"
                    label="Question"
                    rules={[{ required: true, message: 'Please input the question!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                {['A', 'B', 'C', 'D'].map((option) => (
                    <Form.Item
                        key={option}
                        name={`option${option}`}
                        label={`Option ${option}`}
                        rules={[{ required: true, message: `Please input option ${option}!` }]}
                    >
                        <Input />
                    </Form.Item>
                ))}
                <Form.Item
                    name="correct"
                    label="Correct Answer"
                    rules={[{ required: true, message: 'Please select the correct answer!' }]}
                >
                    <Radio.Group>
                        {['A', 'B', 'C', 'D'].map((option) => (
                            <Radio key={option} value={option}>
                                Option {option}
                            </Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="complexity"
                    label="Complexity"
                    rules={[{ required: true, message: 'Please rate the complexity!' }]}
                >
                    <Rate count={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add MCQ
                    </Button>
                </Form.Item>
            </Form>
        </motion.div>
    );
};

export default AddMCQ;
