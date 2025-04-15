"use client"

import { useState, useEffect } from "react"
import { Form, Input, Button, Modal, notification, Select } from "antd"
import { motion } from "framer-motion"
import { useUser } from "../../Context/UserContext"
import { FiBookOpen, FiType, FiTag, FiClock } from "react-icons/fi"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const { Option } = Select
const statusOptions = ["Coming Soon", "Open", "Closed"]
import "../../../CSS/NewOpportunity.css"
import "../../../CSS/quill-styles.css"
import { Put } from "../../../utils/API"

const ModifyOpportunity = ({ isOpen, onClose, opportunity, fetchOpportunities }) => {
    const [form] = Form.useForm()
    const { user, token } = useUser()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editorContent, setEditorContent] = useState("")

    // Set form values when modal opens or opportunity changes
    useEffect(() => {
        if (isOpen && opportunity) {
            form.setFieldsValue(opportunity)
            setEditorContent(opportunity.text || "")
        }
    }, [isOpen, opportunity, form])

    // Update form field when editor content changes
    useEffect(() => {
        form.setFieldsValue({
            text: editorContent,
        })
    }, [editorContent, form])

    const handleSubmit = async (values) => {
        setIsSubmitting(true)
        try {
            const response = await Put({
                url: `/opportunities/put/${opportunity._id}`,
                data: values,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            })

            console.log("API Response:", response) // Debugging: Check what is actually returned

            // Ensure response has data before proceeding
            if (response.message === "Opportunity updated successfully") {
                notification.success({
                    message: "Opportunity Updated",
                    description: "The opportunity has been successfully updated.",
                })
                await fetchOpportunities() // Refresh opportunities list
                onClose()
            }
        } catch (error) {
            console.error("Error updating opportunity:", error)
            notification.error({
                message: "Update Failed",
                description:
                    error.response?.data?.error || error.message || "An error occurred while updating the opportunity.",
            })
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
        <Modal
            title={null}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width="80%"
            style={{ maxWidth: "600px" }}
            closeIcon={null}
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
                    Modify Opportunity
                </h2>
                <Form form={form} onFinish={handleSubmit} layout="vertical" className="space-y-6 sm:space-y-8">
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
                        name="category"
                        rules={[{ required: true, message: "Please select the category!" }]}
                        label={<span className="text-gray-700 font-semibold">Category</span>}
                    >
                        <Select
                            placeholder="Select category"
                            className="w-full bg-white bg-opacity-50 rounded-md shadow-sm"
                            suffixIcon={<FiTag className="text-blue-500" />}
                        >
                            <Option value="internship">Internship</Option>
                            <Option value="job">Job</Option>
                            <Option value="volunteer">Volunteer</Option>
                            <Option value="other">Other</Option>
                        </Select>
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
                            <Option value="internship">Internship</Option>
                            <Option value="scholarship">Scholarship</Option>
                            <Option value="competition">Competition</Option>
                            <Option value="conference">Conference</Option>
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
                            Update
                        </Button>
                    </div>
                </Form>
            </motion.div>
        </Modal>
    )
}

export default ModifyOpportunity
