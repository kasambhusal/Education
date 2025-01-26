import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon, KeyIcon } from '@heroicons/react/24/solid';
import { Post } from '../../utils/API';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [form] = Form.useForm()

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
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


    const onFinishEmail = async (values) => {
        console.log("Hello guys from finished email")
        console.log(values.email)
        try {
            const response = await Post({ url: "/users/forgot-password", data: { email: values.email } });
            message.success(response.message);
            setEmail(values.email);
            setStep(2);
        } catch (error) {
            console.error("Error on Sending OTP", error)
            message.error(error.response?.data?.message || "Failed to send OTP");
        }
    };


    const onFinishOTP = async (values) => {
        try {
            const response = await Post({ url: "/users/verify-otp", data: { email, otp: values.otp } });
            message.success(response.message);
            setStep(3);
        } catch (error) {
            message.error(error.response?.data?.message || "Invalid OTP");
        }
    };


    const onFinishNewPassword = async (values) => {
        try {
            const response = await Post({
                url: "/users/reset-password", data: {
                    email,
                    newPassword: values.newPassword,
                }
            });
            message.success(response.message);
            window.location.href = '/user/login';
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to reset password");
        }
    };


    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Form name="forgotPassword" form={form} onFinish={onFinishEmail} layout="vertical">
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input
                                prefix={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                                placeholder="Email"
                                className="rounded-md"
                            />
                        </Form.Item>
                        <Form.Item>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Send OTP
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </Form>
                );
            case 2:
                return (
                    <Form name="verifyOTP" onFinish={onFinishOTP} layout="vertical">
                        <Form.Item
                            name="otp"
                            rules={[{ required: true, message: 'Please input the OTP!' }]}
                        >
                            <Input
                                prefix={<KeyIcon className="h-5 w-5 text-gray-400" />}
                                placeholder="Enter OTP"
                                className="rounded-md"
                            />
                        </Form.Item>
                        <Form.Item>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Verify OTP
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </Form>
                );
            case 3:
                return (
                    <Form name="resetPassword" onFinish={onFinishNewPassword} layout="vertical">
                        <Form.Item
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                        >
                            <Input.Password
                                prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                                placeholder="New Password"
                                className="rounded-md"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Please confirm your new password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                                placeholder="Confirm New Password"
                                className="rounded-md"
                            />
                        </Form.Item>
                        <Form.Item>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Reset Password
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </Form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex justify-center items-center w-screen min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 py-12">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
                    <motion.div
                        className="text-center mb-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                    >
                        <span className="text-3xl font-bold text-indigo-600">LOGO</span>
                        <span className="text-xl text-gray-600 ml-2">Kya huwa re</span>
                    </motion.div>
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                        {step === 1 && "Forgot Password"}
                        {step === 2 && "Verify OTP"}
                        {step === 3 && "Reset Password"}
                    </h2>
                    {renderStep()}
                    <div className="text-center mt-4">
                        <a href="/user/login" className="text-sm text-indigo-600 hover:text-indigo-800">Back to Login</a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
