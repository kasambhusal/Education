
import { useState, useEffect } from "react"
import { Form, Input, Button, Modal, notification, Select } from "antd"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "../../Context/UserContext"
import { Post } from "../../../utils/API"
import { Link } from "react-router-dom"
import { FiBookOpen, FiType, FiClock } from "react-icons/fi"

import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const { Option } = Select
const statusOptions = ["Coming Soon", "Open", "Closed"]

import "../../../CSS/NewOpportunity.css"
import "../../../CSS/quill-styles.css"


const NewOpportunity = ({ isOpen, onClose, category, onPostCreated }) => {
    const [form] = Form.useForm()
    const { user, token, logout } = useUser()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editorContent, setEditorContent] = useState("")

    // Set the form field value when editor content changes
    useEffect(() => {
        form.setFieldsValue({
            text: editorContent,
        })
    }, [editorContent, form])

    const handleSubmit = async (values) => {
        setIsSubmitting(true)
        const postData = {
            title: values.title,
            text: values.text, // This will contain the HTML content from Quill
            category: category.toLowerCase(),
            type: values.type,
            status: values.status,
            user_email: user.email,
        }

        try {
            await Post({
                url: "/opportunities/post/",
                data: postData,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            })

            notification.success({
                message: "Opportunity Created",
                description: "Your opportunity has been successfully posted.",
            })
            onPostCreated()
            form.resetFields()
            setEditorContent("")
            onClose()
        } catch (error) {
            console.error("Error submitting form:", error)
            if (error.response?.data?.error.includes("Invalid or expired token")) {
                notification.error({
                    message: "Submission Failed",
                    description: (
                        <span>
                            Invalid token.{" "}
                            <Link to="/user/login" onClick={() => logout()} className="text-blue-500 hover:text-blue-600 underline">
                                Click here to relogin
                            </Link>
                        </span>
                    ),
                })
            } else {
                notification.error({
                    message: "Submission Failed",
                    description: error.response?.data?.error || "An error occurred while creating your opportunity.",
                })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    // Quill editor modules and formats configuration
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    }

    const formats = ["header", "bold", "italic", "underline", "strike", "list", "bullet", "link", "image"]

    return (
        <AnimatePresence>
            {isOpen && (
                <Modal
                    title={null}
                    open={isOpen}
                    onCancel={onClose}
                    footer={null}
                    width="80%"
                    style={{ maxWidth: "" }}
                    closeIcon={null}
                    bodyStyle={{ maxHeight: "90vh", overflowY: "auto" }}
                    className="edusphere-modal"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Create New {category} Opportunity
                        </h2>
                        <Form
                            form={form}
                            name="newOpportunityForm"
                            onFinish={handleSubmit}
                            layout="vertical"
                            className="space-y-6 sm:space-y-8"
                        >
                            <Form.Item label={<span className="text-gray-700 font-semibold">Category</span>}>
                                <Input value={category} disabled className="bg-white bg-opacity-50 border-0 rounded-md shadow-sm" />
                            </Form.Item>

                            <Form.Item
                                name="title"
                                rules={[{ required: true, message: "Please enter the opportunity title!" }]}
                                label={<span className="text-gray-700 font-semibold">Title</span>}
                            >
                                <Input
                                    placeholder="Enter an engaging title"
                                    className="bg-white bg-opacity-50 border-0 rounded-md shadow-sm transition-all duration-300 hover:shadow-md focus:shadow-md"
                                    prefix={<FiBookOpen className="text-blue-500 mr-2" />}
                                />
                            </Form.Item>

                            <Form.Item
                                name="text"
                                rules={[{ required: true, message: "Please enter the content!" }]}
                                label={<span className="text-gray-700 font-semibold">Description</span>}
                            >
                                <div className="quill-wrapper bg-white bg-opacity-50 rounded-md shadow-sm transition-all duration-300 hover:shadow-md focus:shadow-md">
                                    <ReactQuill
                                        theme="snow"
                                        value={editorContent}
                                        onChange={setEditorContent}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Describe the opportunity..."
                                        className="bg-white rounded-md"
                                    />
                                </div>
                            </Form.Item>

                            <Form.Item
                                name="type"
                                rules={[{ required: true, message: "Please select the type!" }]}
                                label={<span className="text-gray-700 font-semibold">Type</span>}
                            >
                                <Select
                                    placeholder="Select or enter type"
                                    className="w-full bg-white bg-opacity-50 rounded-md shadow-sm"
                                    showSearch
                                    optionFilterProp="children"
                                    suffixIcon={<FiType className="text-blue-500" />}
                                >
                                    <Option value="general">General</Option>
                                    <Option value="internship">Internship</Option>
                                    <Option value="scholarship">Scholarship</Option>
                                    <Option value="competition">Competition</Option>
                                    <Option value="conference">Conference</Option>
                                    <Option value="hackathon">Hackathon</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="status"
                                rules={[{ required: true, message: "Please select the status!" }]}
                                label={<span className="text-gray-700 font-semibold">Status</span>}
                            >
                                <Select
                                    placeholder="Select status"
                                    className="w-full bg-white bg-opacity-50 rounded-md shadow-sm"
                                    suffixIcon={<FiClock className="text-blue-500" />}
                                >
                                    {statusOptions.map((status) => (
                                        <Option key={status} value={status}>
                                            {status}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <div className="flex justify-end space-x-4">
                                <Button
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    className="px-6 py-2 rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="px-6 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                                    loading={isSubmitting}
                                >
                                    Post
                                </Button>
                            </div>
                        </Form>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    )
}

export default NewOpportunity
