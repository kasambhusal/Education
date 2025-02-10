import { useState } from "react";
import { Form, Input, Button, Modal, notification, Select } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../Context/UserContext";
import { Post } from "../../../utils/API";
import { Link } from "react-router-dom";
import { TitleIcon, ImageIcon } from '../../../assets/Icons';

const { Option } = Select;
const statusOptions = ["Coming Soon", "Open", "Closed"];

const NewOpportunity = ({ isOpen, onClose, category, onPostCreated }) => {
    const [form] = Form.useForm();
    const { user, token, logout } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        const postData = {
            title: values.title,
            text: values.text,
            category: category.toLowerCase(),
            type: values.type.toLowerCase(),
            status: values.status,
            user_email: user.email,
        };

        try {
            await Post({
                url: "/opportunities/post/",
                data: postData,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            notification.success({
                message: "Opportunity Created",
                description: "Your opportunity has been successfully posted.",
            });
            onPostCreated();
            form.resetFields();
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response?.data?.error.includes("Invalid or expired token")) {
                notification.error({
                    message: "Submission Failed",
                    description: (
                        <span>
                            Invalid token. {" "}
                            <Link to="/user/login" onClick={() => logout()} style={{ color: "#1890ff", cursor: "pointer" }}>
                                Click here to relogin
                            </Link>
                        </span>
                    ),
                });
            } else {
                notification.error({
                    message: "Submission Failed",
                    description: error.response?.data?.error || "An error occurred while creating your opportunity.",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Modal
                    title={null}
                    open={isOpen}
                    onCancel={onClose}
                    footer={null}
                    width="90%"
                    style={{ maxWidth: '600px' }}
                    bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 sm:p-6"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Create New {category} Opportunity</h2>
                        <Form form={form} name="newOpportunityForm" onFinish={handleSubmit} layout="vertical" className="space-y-4 sm:space-y-6">
                            <Form.Item name="title" rules={[{ required: true, message: "Please enter the opportunity title!" }]}>
                                <Input placeholder="Enter an engaging title" className="border-b border-gray-300 focus:border-blue-500 transition-colors duration-300" prefix={<TitleIcon className="text-gray-400" />} bordered={false} />
                            </Form.Item>

                            <Form.Item name="text" rules={[{ required: true, message: "Please enter the content!" }]}>
                                <Input.TextArea placeholder="Describe the opportunity..." rows={4} className="border-b border-gray-300 focus:border-blue-500 transition-colors duration-300 resize-none" bordered={false} />
                            </Form.Item>

                            <Form.Item name="type" rules={[{ required: true, message: "Please select the type!" }]}>
                                <Select placeholder="Select type" className="w-full">
                                    <Option value="internship">Internship</Option>
                                    <Option value="scholarship">Scholarship</Option>
                                    <Option value="competition">Competition</Option>
                                    <Option value="conference">Conference</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="status" rules={[{ required: true, message: "Please select the status!" }]}>
                                <Select placeholder="Select status" className="w-full">
                                    {statusOptions.map((status) => (
                                        <Option key={status} value={status}>{status}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <div className="flex justify-end space-x-4">
                                <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                                <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300" loading={isSubmitting}>Post</Button>
                            </div>
                        </Form>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default NewOpportunity;
