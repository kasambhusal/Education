// src/pages/DeleteMCQ.jsx
import React, { useState, useEffect } from 'react';
import { Select, List, Button, message, Modal } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Get } from '../../utils/API';
import { useUser } from '../Context/UserContext';

const { Option } = Select;

const DeleteMCQ = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [mcqs, setMcqs] = useState([]);
    const [mcqToDelete, setMcqToDelete] = useState(null);
    const { token } = useUser();

    useEffect(() => {
        fetchCourses();
    }, []);

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
            if (response.data.length > 0) {
                setSelectedCourse(response.data[0]._id);
                fetchMCQs(response.data[0]._id);
            }
        } catch (error) {
            message.error('Failed to fetch courses');
        }
    };

    const fetchMCQs = async (courseId) => {
        try {
            const response = await Get({
                url: `/courses/${courseId}`,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            setMcqs(response.data.mcqs);
        } catch (error) {
            message.error('Failed to fetch MCQs');
        }
    };

    const handleCourseChange = (courseId) => {
        setSelectedCourse(courseId);
        fetchMCQs(courseId);
    };

    const showDeleteConfirm = (mcqId) => {
        setMcqToDelete(mcqId);
    };

    const handleDelete = async () => {
        try {
            await Delete({
                url: `/courses/${selectedCourse}/mcq/${mcqToDelete}`,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            message.success('MCQ deleted successfully');
            fetchMCQs(selectedCourse);
            setMcqToDelete(null);
        } catch (error) {
            message.error('Failed to delete MCQ');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2>Delete MCQ</h2>
            <Select
                style={{ width: 200, marginBottom: 20 }}
                placeholder="Select a course"
                onChange={handleCourseChange}
                value={selectedCourse}
            >
                {courses.map((course) => (
                    <Option key={course._id} value={course._id}>
                        {course.name}
                    </Option>
                ))}
            </Select>
            <List
                itemLayout="horizontal"
                dataSource={mcqs}
                renderItem={(mcq) => (
                    <List.Item
                        actions={[
                            <Button onClick={() => showDeleteConfirm(mcq._id)} danger>
                                Delete
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={mcq.question}
                            description={`Complexity: ${mcq.complexity}`}
                        />
                    </List.Item>
                )}
            />
            <AnimatePresence>
                {mcqToDelete && (
                    <Modal
                        title="Confirm Delete"
                        visible={true}
                        onOk={handleDelete}
                        onCancel={() => setMcqToDelete(null)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <p>Are you sure you want to delete this MCQ?</p>
                    </Modal>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default DeleteMCQ;