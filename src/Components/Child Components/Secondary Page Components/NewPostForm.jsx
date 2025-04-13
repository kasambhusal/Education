"use client"

import { useState, useEffect } from "react"
import { Form, Input, Button, Modal, notification, Avatar } from "antd"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "../../Context/UserContext"
import { Post } from "../../../utils/API"
import { Link } from "react-router-dom"
import { ImageIcon, Upload, X, Loader } from "lucide-react"

const { TextArea } = Input

const NewPostForm = ({ isOpen, onClose, category, onPostCreated }) => {
    const [form] = Form.useForm()
    const { user, token, logout } = useUser()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [imageError, setImageError] = useState(false)

    // Only reset form when modal is closed, not on cancel button
    useEffect(() => {
        if (!isOpen) {
            // Reset form when modal closes completely
            form.resetFields()
            setImageUrl("")
            setImageError(false)
        }
    }, [isOpen, form])

    const handleImageChange = (e) => {
        const url = e.target.value
        if (url) {
            setImageLoading(true)
            setImageError(false)
        }
        setImageUrl(url)
    }

    const handleImageLoad = () => {
        setImageLoading(false)
        setImageError(false)
    }

    const handleImageError = () => {
        setImageLoading(false)
        setImageError(true)
    }

    const handleCancel = () => {
        // Just close the modal without resetting the form
        onClose()
    }

    const handleSubmit = async (values) => {
        setIsSubmitting(true)

        // Ensure we maintain the exact data structure expected by the backend
        const postData = {
            title: values.title,
            text: values.text,
            category: category.toLowerCase(),
            image: values.image || "", // Always include image field, even if empty
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

            // Only reset form on successful submission
            form.resetFields()
            setImageUrl("")
            onPostCreated()
            onClose()

            notification.success({
                message: "Post Created",
                description: "Your post has been successfully published!",
                placement: "bottomRight",
            })
        } catch (error) {
            console.error("Error submitting form:", error)
            if (error.response?.data?.error?.includes("Invalid or expired token")) {
                notification.error({
                    message: "Session Expired",
                    description: (
                        <span>
                            Your session has expired.{" "}
                            <Link to="/user/login" onClick={() => logout()} style={{ color: "#1890ff", cursor: "pointer" }}>
                                Click here to login again
                            </Link>
                        </span>
                    ),
                    placement: "bottomRight",
                })
            } else {
                notification.error({
                    message: "Submission Failed",
                    description: error.response?.data?.error || "An error occurred while creating your post.",
                    placement: "bottomRight",
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
                    onCancel={handleCancel}
                    footer={null}
                    width={800}
                    className="new-post-modal"
                    maskStyle={{ backdropFilter: "blur(4px)", background: "rgba(0, 0, 0, 0.45)" }}
                    bodyStyle={{ padding: 0, borderRadius: "12px", overflow: "hidden" }}
                    style={{ borderRadius: "12px", overflow: "hidden" }}
                    closeIcon={<X className="h-5 w-5 text-gray-500 hover:text-gray-700" />}
                    centered
                >
                    <div className="bg-white p-0">
                        {/* Header with user info - LinkedIn style */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center">
                                <Avatar src={user?.image} size={40} className="mr-3 border-2 border-blue-100">
                                    {user?.fullname?.charAt(0) || "U"}
                                </Avatar>
                                <div>
                                    <div className="font-medium text-gray-800">{user?.fullname || "User"}</div>
                                    <div className="text-xs text-gray-500">Posting to {category}</div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col w-full"
                        >
                            <Form
                                form={form}
                                name="newPostForm"
                                onFinish={handleSubmit}
                                layout="vertical"
                                className="p-0"
                                requiredMark={false}
                            >
                                {/* LinkedIn-style title input */}
                                <div className="px-4 pt-3 mt-2 mb-5">
                                    <Form.Item
                                        name="title"
                                        rules={[
                                            { required: true, message: "Please enter a title for your post" },
                                            { min: 1, max: 100, message: "Title must be between 1 and 100 characters" },
                                        ]}
                                        className="mb-3"
                                    >
                                        <Input
                                            placeholder="Add an engaging title (1-100 characters)"
                                            className="text-xl font-medium border-0 px-0 py-2 shadow-none focus:shadow-none hover:bg-gray-50 rounded-md"
                                            bordered={false}
                                            size="large"
                                            maxLength={100}
                                            showCount
                                        />
                                    </Form.Item>
                                </div>

                                {/* Content textarea */}
                                <div className="px-4 mt-2 mb-5">
                                    <Form.Item
                                        name="text"
                                        rules={[
                                            { required: true, message: "Please enter content for your post" },
                                            { max: 1000, message: "Content must be less than 1000 characters" },
                                        ]}
                                        className="mb-3"
                                    >
                                        <TextArea
                                            placeholder="What do you want to talk about?"
                                            autoSize={{ minRows: 3, maxRows: 8 }}
                                            className="text-base border-0 px-0 py-2 shadow-none focus:shadow-none hover:bg-gray-50 rounded-md resize-none"
                                            bordered={false}
                                            showCount
                                            maxLength={1000}
                                        />
                                    </Form.Item>
                                </div>

                                {/* Image URL input - always visible */}
                                <div className="px-4 pb-3 mt-2 mb-5">
                                    <Form.Item
                                        name="image"
                                        rules={[{ type: "url", message: "Please enter a valid image URL" }]}
                                        className="mb-2"
                                    >
                                        <Input
                                            prefix={<ImageIcon className="h-4 w-4 text-blue-400 mr-2" />}
                                            placeholder="Add an image URL (optional)"
                                            className="py-2 px-3 rounded-md border border-gray-200 focus:border-blue-500 hover:border-blue-300 transition-colors"
                                            onChange={handleImageChange}
                                            allowClear
                                        />
                                    </Form.Item>
                                </div>

                                {/* Image Preview - Full width like LinkedIn */}
                                <AnimatePresence>
                                    {imageUrl && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="w-full mb-4 relative"
                                        >
                                            <div className="relative w-full" style={{ maxHeight: "400px", overflow: "hidden" }}>
                                                {imageLoading && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                                                        <Loader className="h-8 w-8 text-blue-500 animate-spin" />
                                                    </div>
                                                )}

                                                {imageError ? (
                                                    <div className="flex flex-col items-center justify-center py-10 bg-gray-50">
                                                        <Upload className="h-12 w-12 mb-2 text-gray-400" />
                                                        <p className="text-center text-gray-500">Unable to load image</p>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={imageUrl || "/placeholder.svg"}
                                                        alt="Post preview"
                                                        className={`w-full object-contain ${imageLoading ? "opacity-0" : "opacity-100"}`}
                                                        style={{ maxHeight: "400px" }}
                                                        onLoad={handleImageLoad}
                                                        onError={handleImageError}
                                                    />
                                                )}

                                                {/* Remove image button */}
                                                {!imageError && (
                                                    <button
                                                        className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
                                                        onClick={() => {
                                                            setImageUrl("")
                                                            form.setFieldsValue({ image: "" })
                                                        }}
                                                        type="button"
                                                    >
                                                        <X className="h-5 w-5 text-gray-700" />
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* LinkedIn-style action bar */}
                                <div className="px-4 py-3 border-t border-gray-100 flex justify-end items-center">
                                    <div className="flex space-x-3">
                                        <Button
                                            onClick={handleCancel}
                                            className="px-4 py-1 h-auto border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors rounded-full"
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </Button>
                                        <motion.div
                                            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                                            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                                        >
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="px-5 py-1 h-auto bg-blue-600 hover:bg-blue-700 border-none rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center"
                                                loading={isSubmitting}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Posting..." : "Post"}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </Form>
                        </motion.div>
                    </div>
                </Modal>
            )}
        </AnimatePresence>
    )
}

export default NewPostForm
