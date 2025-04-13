"use client"

import { useEffect, useState } from "react"
import { Form, Input, Button, notification, Progress, Steps } from "antd"
import { motion, AnimatePresence } from "framer-motion"
import { EnvelopeIcon, LockClosedIcon, KeyIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { Post } from "../../utils/API"
import { Link, useNavigate } from "react-router-dom"

// Simple XOR cipher for basic obfuscation - same as login page
const encrypt = (text) => {
    const key = "edusphereSecretKey"
    return text
        .split("")
        .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length)))
        .join("")
}

const decrypt = (text) => {
    return encrypt(text)
}

const ForgotPassword = () => {
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState("")
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Password validation state
    const [password, setPassword] = useState("")
    const [passwordScore, setPasswordScore] = useState(0)
    const [passwordFeedback, setPasswordFeedback] = useState({
        hasSpecialChar: false,
        hasNumber: false,
        noCapital: true,
        noHyphen: true,
        minLength: false,
    })

    // Password validation function - same as signup page
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

    // Try to pre-fill email from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        const rememberedUser = localStorage.getItem("rememberedUser")

        if (rememberedUser) {
            try {
                const { email } = JSON.parse(rememberedUser)
                if (email) {
                    form.setFieldsValue({ email })
                }
            } catch (error) {
                console.error("Error parsing remembered user:", error)
            }
        } else if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser)
                if (typeof parsedUser === "string") {
                    form.setFieldsValue({ email: parsedUser })
                } else if (parsedUser && typeof parsedUser.email === "string") {
                    form.setFieldsValue({ email: parsedUser.email })
                }
            } catch (error) {
                console.error("Error parsing stored user:", error)
            }
        }
    }, [form])

    // Step 1: Send OTP to email
    const onFinishEmail = async (values) => {
        setLoading(true)
        try {
            const response = await Post({
                url: "/users/forgot-password",
                data: { email: values.email },
            })

            notification.success({
                message: "OTP Sent",
                description: response.message || "OTP has been sent to your email address.",
                duration: 4,
            })

            setEmail(values.email)
            setStep(1)
        } catch (error) {
            console.error("Error on Sending OTP", error)
            notification.error({
                message: "Failed to Send OTP",
                description: error.response?.data?.message || "Failed to send OTP. Please try again.",
                duration: 4,
            })
        } finally {
            setLoading(false)
        }
    }

    // Step 2: Verify OTP
    const onFinishOTP = async (values) => {
        setLoading(true)
        try {
            const response = await Post({
                url: "/users/verify-otp",
                data: { email, otp: values.otp },
            })

            notification.success({
                message: "OTP Verified",
                description: response.message || "OTP verified successfully.",
                duration: 4,
            })

            setStep(2)
        } catch (error) {
            notification.error({
                message: "Invalid OTP",
                description: error.response?.data?.message || "Invalid OTP. Please try again.",
                duration: 4,
            })
        } finally {
            setLoading(false)
        }
    }

    // Step 3: Reset Password
    const onFinishNewPassword = async (values) => {
        // Validate password one more time
        const { isValid } = validatePassword(values.newPassword)
        if (!isValid) {
            notification.error({
                message: "Invalid Password",
                description: "Please make sure your password meets all requirements.",
                duration: 4,
            })
            return
        }

        setLoading(true)
        try {
            const response = await Post({
                url: "/users/reset-password",
                data: {
                    email,
                    newPassword: values.newPassword,
                },
            })

            notification.success({
                message: "Password Reset Successful",
                description: response.message || "Your password has been reset successfully.",
                duration: 4,
            })

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate("/user/login")
            }, 2000)
        } catch (error) {
            notification.error({
                message: "Password Reset Failed",
                description: error.response?.data?.message || "Failed to reset password. Please try again.",
                duration: 4,
            })
        } finally {
            setLoading(false)
        }
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

    // Step content components
    const renderStepContent = () => {
        switch (step) {
            case 0: // Request OTP
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8">
                        <motion.div variants={itemVariants} className="mb-6">
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
                                        Send OTP
                                    </Button>
                                </motion.div>
                            </Form.Item>
                        </motion.div>
                    </motion.div>
                )

            case 1: // Verify OTP
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8">
                        <motion.div variants={itemVariants} className="mb-6">
                            <p className="text-gray-600 mb-4 text-center">
                                We've sent a verification code to <span className="font-medium">{email}</span>
                            </p>
                            <Form.Item
                                name="otp"
                                rules={[
                                    { required: true, message: "Please input the OTP!" },
                                    {
                                        pattern: /^\d+$/,
                                        message: "OTP must contain only numbers!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<KeyIcon className="h-5 w-5 text-gray-400" />}
                                    placeholder="Enter OTP"
                                    className="rounded-md py-2 text-center tracking-widest"
                                    size="large"
                                    maxLength={6}
                                />
                            </Form.Item>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-4">
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
                                        Verify OTP
                                    </Button>
                                </motion.div>
                            </Form.Item>
                        </motion.div>

                        <motion.div variants={itemVariants} className="text-center">
                            <Button
                                type="link"
                                onClick={() => {
                                    if (!loading) {
                                        form.resetFields(["otp"])
                                        onFinishEmail({ email })
                                    }
                                }}
                                disabled={loading}
                                className="text-indigo-600 hover:text-indigo-800"
                            >
                                Resend OTP
                            </Button>
                        </motion.div>
                    </motion.div>
                )

            case 2: // Reset Password
                return (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8">
                        <motion.div variants={itemVariants} className="mb-6">
                            <Form.Item
                                name="newPassword"
                                rules={[
                                    { required: true, message: "Please input your new password!" },
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
                                    placeholder="New Password"
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
                                    className="mb-6"
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

                        <motion.div variants={itemVariants} className="mb-6">
                            <Form.Item
                                name="confirmPassword"
                                dependencies={["newPassword"]}
                                rules={[
                                    { required: true, message: "Please confirm your new password!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("newPassword") === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(new Error("The two passwords do not match!"))
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                                    placeholder="Confirm New Password"
                                    className="rounded-md py-2"
                                    size="large"
                                />
                            </Form.Item>
                        </motion.div>

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
                                        Reset Password
                                    </Button>
                                </motion.div>
                            </Form.Item>
                        </motion.div>
                    </motion.div>
                )

            default:
                return null
        }
    }

    // Step titles for the Steps component
    const steps = [
        {
            title: "Request OTP",
            description: "Enter your email",
        },
        {
            title: "Verify OTP",
            description: "Enter the code sent to your email",
        },
        {
            title: "Reset Password",
            description: "Create a new password",
        },
    ]

    return (
        <div className="flex justify-center items-center w-screen min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl"
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
                                Reset Your Password
                            </motion.h2>
                            <motion.p
                                className="text-gray-600 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Follow these steps to reset your password
                            </motion.p>
                        </motion.div>

                        {/* Progress Steps - Responsive */}
                        <div className="mb-8">
                            {/* Desktop Steps - Hidden on small screens */}
                            <div className="hidden sm:block">
                                <Steps
                                    current={step}
                                    items={steps.map((item, index) => ({
                                        title: item.title,
                                        description: item.description,
                                    }))}
                                    size="small"
                                />
                            </div>

                            {/* Mobile Steps - Shown only on small screens */}
                            <div className="block sm:hidden">
                                <div className="flex justify-between items-center mb-4">
                                    {steps.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-col items-center ${index === step ? "text-indigo-600" : index < step ? "text-green-500" : "text-gray-400"
                                                }`}
                                        >
                                            <div
                                                className={`
                        flex items-center justify-center w-8 h-8 rounded-full mb-1
                        ${index === step
                                                        ? "bg-indigo-100 border-2 border-indigo-600"
                                                        : index < step
                                                            ? "bg-green-100 border-2 border-green-500"
                                                            : "bg-gray-100 border-2 border-gray-300"
                                                    }
                      `}
                                            >
                                                {index < step ? (
                                                    <CheckCircleIcon className="h-5 w-5" />
                                                ) : (
                                                    <span className="text-sm font-medium">{index + 1}</span>
                                                )}
                                            </div>
                                            <span className="text-xs font-medium">{item.title}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Connecting lines */}
                                <div className="absolute left-0 right-0 flex justify-center -mt-9">
                                    <div className="w-2/3 flex justify-between">
                                        {steps.slice(0, steps.length - 1).map((_, index) => (
                                            <div
                                                key={index}
                                                className={`h-0.5 w-[48%] ${step > index ? "bg-green-500" : "bg-gray-300"}`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Current step description - mobile */}
                                <div className="text-center text-sm text-gray-600 mt-2">{steps[step].description}</div>
                            </div>
                        </div>

                        {/* Dynamic Form based on current step */}
                        <Form
                            form={form}
                            name={`step${step + 1}`}
                            onFinish={step === 0 ? onFinishEmail : step === 1 ? onFinishOTP : onFinishNewPassword}
                            layout="vertical"
                            className="transition-all duration-300"
                        >
                            {renderStepContent()}
                        </Form>

                        <motion.div
                            className="text-center mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/user/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                Back to Login
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ForgotPassword
