import { useState } from "react"
import { Form, Input, Button, Modal, notification } from "antd"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "../../Context/UserContext"
import { Post } from "../../../utils/API"
import { Link } from "react-router-dom"
import { TitleIcon, ImageIcon } from '../../../assets/Icons'

const NewPostForm = ({ isOpen, onClose, category, onPostCreated }) => {
    const [form] = Form.useForm()
    const { user, token, logout } = useUser()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (values) => {
        setIsSubmitting(true)
        const postData = {
            title: values.title,
            text: values.text,
            category: category.toLowerCase(),
            image: values.image || "",
            user_email: user.email,
        }

        try {
            await Post({
                url: "/clubs/post",
                data: postData,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            })

            notification.success({
                message: "Post Created",
                description: "Your post has been successfully created.",
            })
            onPostCreated()
            form.resetFields()
            onClose()
        } catch (error) {
            console.error("Error submitting form:", error)
            if (error.response?.data?.error.includes("Invalid or expired token")) {
                notification.error({
                    message: "Submission Failed",
                    description: (
                        <span>
                            Invalid token.{" "}
                            <Link to="/user/login" onClick={() => logout()}
                                style={{ color: "#1890ff", cursor: "pointer" }}
                            >
                                Click here to relogin
                            </Link>
                        </span>
                    )
                })
            } else {
                notification.error({
                    message: "Submission Failed",
                    description: error.response?.data?.error || "An error occurred while creating your post.",
                })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

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
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Create New {category} Post</h2>
                        <Form form={form} name="newPostForm" onFinish={handleSubmit} layout="vertical" className="space-y-4 sm:space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Form.Item name="title" rules={[{ required: true, message: "Please enter the post title!" }]}>
                                    <Input
                                        placeholder="Enter an engaging title"
                                        className="text-base sm:text-lg border-b border-gray-300 focus:border-blue-500 transition-colors duration-300"
                                        prefix={<TitleIcon className="text-gray-400" />}
                                        bordered={false}
                                    />
                                </Form.Item>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Form.Item name="text" rules={[{ required: true, message: "Please enter the content!" }]}>
                                    <Input.TextArea
                                        placeholder="Share your thoughts..."
                                        rows={4}
                                        className="text-sm sm:text-base border-b border-gray-300 focus:border-blue-500 transition-colors duration-300 resize-none"
                                        bordered={false}
                                    />
                                </Form.Item>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Form.Item name="image" rules={[{ type: "url", message: "Please enter a valid url!" }]}>
                                    <Input
                                        placeholder="Enter image URL (optional)"
                                        className="text-sm sm:text-base border-b border-gray-300 focus:border-blue-500 transition-colors duration-300"
                                        prefix={<ImageIcon className="text-gray-400" />}
                                        bordered={false}
                                    />
                                </Form.Item>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex justify-end space-x-4"
                            >
                                <Button onClick={onClose} className="px-4 sm:px-6" disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="px-4 sm:px-6 bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                                    loading={isSubmitting}
                                >
                                    Post
                                </Button>
                            </motion.div>
                        </Form>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    )
}

export default NewPostForm
