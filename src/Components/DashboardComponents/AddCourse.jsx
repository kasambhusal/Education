import React, { useState } from 'react';
import { Form, Input, Button, Select, Radio, Rate, message } from 'antd';
import { motion } from 'framer-motion';
import { useUser } from '../Context/UserContext';
import { Post } from '../../utils/API';

const { Option } = Select;

const AddCourse = () => {
    const [form] = Form.useForm();
    const { token } = useUser();

    const onFinish = async (values) => {
        try {
            await Post({
                url: "/courses",
                data: values,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            message.success('Course added successfully');
            form.resetFields();
        } catch (error) {
            message.error('Failed to add course');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2>Add New Course</h2>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="name"
                    label="Course Name"
                    rules={[{ required: true, message: 'Please input the course name!' }]}
                >
                    <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Add Course
                </Button>
            </Form>
        </motion.div>
    );
};

export default AddCourse;