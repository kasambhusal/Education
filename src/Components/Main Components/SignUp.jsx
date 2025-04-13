"use client"

import { useState } from "react"
import { Button, Form, Input, notification, Progress } from "antd"
import { motion, AnimatePresence } from "framer-motion"
import {
    UserIcon,
    EnvelopeIcon,
    CameraIcon,
    LockClosedIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid"
import { Post } from "../../utils/API" // Adjust the path as needed
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordScore, setPasswordScore] = useState(0)
    const [passwordFeedback, setPasswordFeedback] = useState({
        hasSpecialChar: false,
        hasNumber: false,
        noCapital: true,
        noHyphen: true,
        minLength: false,
    })
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState("")

    // Password validation function
    const validatePassword = (password) => {
        const hasSpecialChar = /[@#*]/.test(password)
        const hasNumber = /\d/.test(password)
        const noCapital = !/[A-Z]/.test(password)
        const noHyphen = !/-/.test(password)
        const minLength = password.length >= 8

        setPasswordFeedback({
            hasSpecialChar,
            hasNumber,
            noCapital,
            noHyphen,
            minLength,
        })

        // Calculate password strength score (0-100)
        let score = 0
        if (hasSpecialChar) score += 20
        if (hasNumber) score += 20
        if (noCapital) score += 20
        if (noHyphen) score += 20
        if (minLength) score += 20

        setPasswordScore(score)

        return {
            isValid: hasSpecialChar && hasNumber && noCapital && noHyphen && minLength,
            score,
        }
    }

    // Handle password change
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value
        setPassword(newPassword)
        validatePassword(newPassword)
    }

    // Handle image URL change
    const handleImageChange = (e) => {
        const url = e.target.value
        setImageUrl(url)
    }

    const getProgressStatus = (score) => {
        if (score < 40) return "exception"
        if (score < 80) return "normal"
        return "success"
    }

    const getProgressStrokeColor = (score) => {
        if (score < 40) return "#ff4d4f"
        if (score < 80) return "#faad14"
        return "#52c41a"
    }

    const onFinish = async (values) => {
        // Validate password one more time
        const { isValid } = validatePassword(values.password)
        if (!isValid) {
            notification.error({
                message: "Invalid Password",
                description: "Please make sure your password meets all requirements.",
            })
            return
        }

        setLoading(true)
        try {
            const response = await Post({
                url: "/users/register", // Your backend signup endpoint
                data: {
                    fullname: values.username,
                    email: values.email,
                    image: values.image || "", // Provide empty string as default if no image
                    password: values.password,
                },
            })

            notification.success({
                message: "Registration Successful",
                description: "You have successfully registered. Please log in.",
            })

            // Redirect to login page after successful registration
            setTimeout(() => {
                navigate("/user/login")
            }, 2000)
        } catch (error) {
            console.error("SignUp failed", error?.response?.data)
            const errorMessage = error?.response?.data?.errors || "An unexpected error occurred. Please try again."

            notification.error({
                message: "Registration Error",
                description: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
                duration: 3,
            })
        } finally {
            setLoading(false)
        }
    }

    const onFinishFailed = (errorInfo) => {
        notification.warning({
            message: "Validation Failed",
            description: "Please check the form and try again.",
        })
    }

    // Requirement item component
    const RequirementItem = ({ met, text }) => (
        <motion.div
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            {met ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : <XCircleIcon className="h-4 w-4 text-red-500" />}
            <span className={met ? "text-green-700" : "text-gray-600"}>{text}</span>
        </motion.div>
    )

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

    return (
        <div className="flex justify-center items-center w-screen min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 py-12">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md px-4"
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

                    <Form
                        form={form}
                        className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 relative z-10"
                        name="signup"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        {/* Logo Section */}
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
                                Create Your Account
                            </motion.h2>
                            <motion.p
                                className="text-gray-600 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Join EduSphere and start learning today
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
                                        onError={(e) => {
                                            e.target.src = "/placeholder.svg"
                                        }}
                                    />
                                    <div className="absolute bottom-0 right-0 bg-indigo-500 rounded-full p-1 border-2 border-white">
                                        <CameraIcon className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Form Fields */}
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div variants={itemVariants}>
                                <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                                    <Input
                                        prefix={<UserIcon className="h-5 w-5 text-gray-400" />}
                                        placeholder="Username"
                                        className="rounded-md py-2"
                                        size="large"
                                    />
                                </Form.Item>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: "Please input your email!" },
                                        { type: "email", message: "Please enter a valid email!" },
                                    ]}
                                >
                                    <Input
                                        prefix={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                                        placeholder="Email"
                                        className="rounded-md py-2"
                                        size="large"
                                    />
                                </Form.Item>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Form.Item
                                    name="image"
                                    rules={[
                                        // Removed required rule
                                        { type: "url", message: "Please enter a valid URL if providing an image" },
                                    ]}
                                >
                                    <Input
                                        prefix={<CameraIcon className="h-5 w-5 text-gray-400" />}
                                        placeholder="Profile Image URL (optional)"
                                        className="rounded-md py-2"
                                        size="large"
                                        onChange={handleImageChange}
                                    />
                                </Form.Item>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: "Please input your password!" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                const { isValid } = validatePassword(value)
                                                if (!value || isValid) {
                                                    return Promise.resolve()
                                                }
                                                return Promise.reject(new Error("Password does not meet requirements!"))
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                                        placeholder="Password"
                                        className="rounded-md py-2"
                                        size="large"
                                        onChange={handlePasswordChange}
                                    />
                                </Form.Item>
                            </motion.div>

                            {/* Password strength indicator */}
                            <AnimatePresence>
                                {password && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-4"
                                    >
                                        <div className="mb-2">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-600">Password Strength</span>
                                                <span className="text-sm font-medium">
                                                    {passwordScore < 40 ? "Weak" : passwordScore < 80 ? "Medium" : "Strong"}
                                                </span>
                                            </div>
                                            <Progress
                                                percent={passwordScore}
                                                status={getProgressStatus(passwordScore)}
                                                strokeColor={getProgressStrokeColor(passwordScore)}
                                                showInfo={false}
                                                size="small"
                                            />
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                                            <div className="grid grid-cols-1 gap-2">
                                                <RequirementItem
                                                    met={passwordFeedback.hasSpecialChar}
                                                    text="Include at least one special character (@, #, *)"
                                                />
                                                <RequirementItem met={passwordFeedback.hasNumber} text="Include at least one number" />
                                                <RequirementItem met={passwordFeedback.noCapital} text="No capital letters" />
                                                <RequirementItem met={passwordFeedback.noHyphen} text="No hyphens (-)" />
                                                <RequirementItem met={passwordFeedback.minLength} text="Minimum 8 characters" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div variants={itemVariants}>
                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={["password"]}
                                    rules={[
                                        { required: true, message: "Please confirm your password!" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve()
                                                }
                                                return Promise.reject(new Error("The two passwords do not match!"))
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                                        placeholder="Confirm Password"
                                        className="rounded-md py-2"
                                        size="large"
                                    />
                                </Form.Item>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div variants={itemVariants}>
                                <Form.Item>
                                    <motion.div whileHover={{ scale: loading ? 1 : 1.03 }} whileTap={{ scale: loading ? 1 : 0.97 }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-6 text-center h-auto flex items-center justify-center"
                                            size="large"
                                            loading={loading}
                                            disabled={loading}
                                        >
                                            Create Account
                                        </Button>
                                    </motion.div>
                                </Form.Item>
                            </motion.div>

                            {/* Redirect to Login */}
                            <motion.div className="text-center mt-4" variants={itemVariants}>
                                <span className="text-gray-600">Already have an account? </span>
                                <Link to="/user/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                    Log in
                                </Link>
                            </motion.div>
                        </motion.div>
                    </Form>
                </div>
            </motion.div>
        </div>
    )
}

export default SignUp
