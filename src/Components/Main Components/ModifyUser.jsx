"use client"

import { useEffect, useState } from "react"
import { Button, Form, Input, notification, Avatar, Drawer } from "antd"
import { motion, AnimatePresence } from "framer-motion"
import {
    UserIcon,
    EnvelopeIcon,
    CameraIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid"
import { Post } from "../../utils/API" // Adjust the path as needed
import { Link } from "react-router-dom"
import { useUser } from "../Context/UserContext"

// Custom notification component
const SuccessNotification = ({ message, user }) => (
    <div className="flex items-start">
        <div className="mr-3">
            <Avatar src={user.image} size={40} className="border-2 border-green-200" />
        </div>
        <div>
            <div className="font-medium text-green-600 mb-1 flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-1" /> Success
            </div>
            <div className="text-gray-700">{message}</div>
            <div className="mt-1 text-xs text-gray-500">Profile updated for {user.fullname}</div>
        </div>
    </div>
)

const ModifyUser = ({ visible = true, onClose }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [successData, setSuccessData] = useState(null)
    const [formChanged, setFormChanged] = useState(false)
    const [initialValues, setInitialValues] = useState({})
    const { user, updateUserProfile } = useUser()

    // Pre-fill form with user data from context
    useEffect(() => {
        if (user && visible) {
            // Set initial form values based on the actual structure of the user object
            const values = {
                fullname: user.fullname || user.name || "",
                email: user.email || "",
                image: user.image || "",
            }

            setInitialValues(values)
            form.setFieldsValue(values)
            setImageUrl(values.image)
            setFormChanged(false) // Reset form changed state when drawer opens
        }
    }, [form, user, visible])

    // Track form changes
    const handleFormChange = () => {
        const currentValues = form.getFieldsValue()

        // Check if any field has changed from initial values
        const hasChanged = Object.keys(currentValues).some((key) => currentValues[key] !== initialValues[key])

        setFormChanged(hasChanged)
    }

    const onFinish = async (values) => {
        const userId = user?._id || user?.id

        if (!userId) {
            notification.error({
                message: "Authentication Error",
                description: "You must be logged in to modify your profile.",
                duration: 4,
            })
            if (onClose) onClose()
            return
        }

        setLoading(true)
        try {
            const response = await Post({
                url: `/users/modify-user/${userId}`,
                data: {
                    fullname: values.fullname,
                    email: values.email,
                    image: values.image,
                },
            })

            // Store success data for animated success message
            setSuccessData({
                message: response.message,
                user: response.user,
            })

            // Show animated success message
            setShowSuccess(true)

            // Update the user context with new data from the response
            updateUserProfile(response.user)

            // Hide success message and close drawer after 2 seconds
            setTimeout(() => {
                setShowSuccess(false)
                if (onClose) onClose()
            }, 2000)
        } catch (error) {
            console.error("Profile update failed", error?.response?.data)

            const errorMessage = error?.response?.data?.errors || "An unexpected error occurred. Please try again."

            notification.error({
                message: "Update Failed",
                description: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
                duration: 4,
                style: {
                    backgroundColor: "#fef2f2", // Light red background
                    borderLeft: "4px solid #ef4444", // Red border
                },
            })
        } finally {
            setLoading(false)
        }
    }

    // Handle image URL change
    const handleImageChange = (e) => {
        const url = e.target.value
        setImageUrl(url)
        form.setFieldsValue({ image: url })
        handleFormChange()
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    }

    const successVariants = {
        hidden: { opacity: 0, y: -20, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.8,
            transition: {
                duration: 0.3,
            },
        },
    }

    // Drawer content
    const drawerContent = (
        <div className="relative h-full">
            {/* Success message overlay */}
            <AnimatePresence>
                {showSuccess && successData && (
                    <motion.div
                        className="absolute inset-0 z-20 flex items-center justify-center"
                        variants={successVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl border-2 border-green-200 w-full max-w-sm">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircleIcon className="h-10 w-10 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Profile Updated!</h3>
                                <p className="text-gray-600 mb-4">{successData.message}</p>
                                <div className="flex items-center gap-3 mb-2">
                                    <Avatar src={successData.user.image} size={40} className="border-2 border-green-200" />
                                    <div className="text-left">
                                        <div className="font-medium">{successData.user.fullname}</div>
                                        <div className="text-sm text-gray-500">{successData.user.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="py-4">
                <motion.div
                    className="text-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                >
                    <Link to="/" className="w-full flex justify-center">
                        <img src="/logo.png" alt="Logo" className="max-w-[80%] max-h-[100px]" />
                    </Link>
                    <motion.h2
                        className="text-2xl font-bold text-gray-800 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Edit Profile
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Update your personal information
                    </motion.p>
                </motion.div>

                {/* Profile Image Preview */}
                {imageUrl && (
                    <motion.div
                        className="flex justify-center mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="relative">
                            <img
                                src={imageUrl || "/placeholder.svg"}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                                
                            />
                            <div className="absolute bottom-0 right-0 bg-indigo-500 rounded-full p-1 border-2 border-white">
                                <CameraIcon className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Form */}
                <Form
                    form={form}
                    name="modifyUser"
                    onFinish={onFinish}
                    layout="vertical"
                    className="transition-all duration-300"
                    initialValues={{
                        fullname: "",
                        email: "",
                        image: "",
                    }}
                    onValuesChange={handleFormChange}
                >
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div variants={itemVariants} className="mb-4">
                            <Form.Item
                                name="fullname"
                                rules={[{ required: true, message: "Please input your name!" }]}
                                className="mb-4"
                            >
                                <Input
                                    prefix={<UserIcon className="h-5 w-5 text-gray-400" />}
                                    placeholder="Full Name"
                                    className="rounded-md py-2"
                                    size="large"
                                />
                            </Form.Item>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-4">
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Please input your email!" },
                                    { type: "email", message: "Please enter a valid email!" },
                                ]}
                                className="mb-4"
                            >
                                <Input
                                    prefix={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                                    placeholder="Email"
                                    className="rounded-md py-2"
                                    size="large"
                                />
                            </Form.Item>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-6">
                            <Form.Item
                                name="image"
                                rules={[
                                    { required: true, message: "Please input your image URL!" },
                                    { type: "url", message: "Please enter a valid URL!" },
                                ]}
                                className="mb-4"
                            >
                                <Input
                                    prefix={<CameraIcon className="h-5 w-5 text-gray-400" />}
                                    placeholder="Profile Image URL"
                                    className="rounded-md py-2"
                                    size="large"
                                    onChange={handleImageChange}
                                />
                            </Form.Item>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Form.Item>
                                <div className="flex gap-4">
                                    <motion.div
                                        whileHover={{ scale: loading || !formChanged ? 1 : 1.03 }}
                                        whileTap={{ scale: loading || !formChanged ? 1 : 0.97 }}
                                        className="flex-1"
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className={`w-full ${formChanged ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-400 cursor-not-allowed"
                                                } focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-6 text-center h-auto flex items-center justify-center`}
                                            size="large"
                                            loading={loading}
                                            disabled={loading || !formChanged}
                                            icon={loading ? <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" /> : null}
                                        >
                                            {loading ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
                                        <Button
                                            type="default"
                                            className="w-full border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg text-sm px-5 py-6 text-center h-auto flex items-center justify-center"
                                            size="large"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                    </motion.div>
                                </div>
                            </Form.Item>
                        </motion.div>
                    </motion.div>
                </Form>

                {/* Additional options */}
                <motion.div
                    className="text-center mt-6 pt-6 border-t border-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <Link to="/user/password-forgot" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                        Change Password
                    </Link>
                </motion.div>
            </div>
        </div>
    )

    // For standalone usage (not in a drawer)
    if (!onClose) {
        return (
            <div className="flex justify-center items-center w-screen min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="relative">
                        {/* Decorative elements */}
                        <motion.div
                            className="absolute -top-6 -left-6 w-16 h-16 bg-purple-300 rounded-full opacity-70"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        />
                        <motion.div
                            className="absolute -bottom-6 -right-6 w-20 h-20 bg-indigo-300 rounded-full opacity-70"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        />

                        <div className="bg-white shadow-2xl rounded-lg px-6 sm:px-8 pt-6 pb-8 mb-4 relative z-10">
                            {drawerContent}
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }

    // Return as a drawer
    return (
        <Drawer
            title={
                <div className="flex justify-between items-center">
                    <Button
                        type="text"
                        icon={<XMarkIcon className="h-5 w-5" />}
                        onClick={onClose}
                        className="flex items-center justify-center hover:bg-gray-100 rounded-full w-8 h-8 p-0"
                    />
                </div>
            }
            placement="right"
            closable={false}
            onClose={onClose}
            open={visible}
            width={400}
            className="profile-drawer"
            styles={{
                body: {
                    padding: "0 16px",
                    height: "calc(100% - 55px)",
                    overflowY: "auto",
                },
                header: {
                    borderBottom: "1px solid #f0f0f0",
                    padding: "16px",
                },
            }}
        >
            {drawerContent}
        </Drawer>
    )
}

export default ModifyUser
