import React from 'react';
import { Button, Form, Input, Radio, notification } from 'antd';
import { motion } from 'framer-motion';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { Post } from '../../utils/API'; // Adjust the path as needed

const SignUp = () => {
    const onFinish = async (values) => {
        try {
            const response = await Post({
                url: '/users/register', // Your backend signup endpoint
                data: {
                    fullname: values.username,
                    email: values.email,
                    password: values.password,
                },
            });
            notification.success({
                message: 'Registration Successful',
                description: 'You have successfully registered. Please log in.',
            });
        } catch (error) {
            notification.error({
                message: 'Registration Failed',
                description: error?.response?.data?.errors || 'Something went wrong. Please try again.',
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        notification.warning({
            message: 'Validation Failed',
            description: 'Please check the form and try again.',
        });
    };

    return (
        <div className="flex justify-center items-center w-screen min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 py-12">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Form
                    className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4"
                    name="signup"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    {/* Logo Section */}
                    <motion.div
                        className="text-center mb-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                    >
                        <span className="text-3xl font-bold text-indigo-600">LOGO</span>
                        <span className="text-xl text-gray-600 ml-2">Kya huwa re</span>
                    </motion.div>

                    {/* Form Fields */}
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            prefix={<UserIcon className="h-5 w-5 text-gray-400" />}
                            placeholder="Username"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input
                            prefix={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                            placeholder="Email"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                            placeholder="Password"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
                            placeholder="Confirm Password"
                            className="rounded-md"
                        />
                    </Form.Item>
                    {/* Submit Button */}
                    <Form.Item>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign Up
                            </Button>
                        </motion.div>
                    </Form.Item>

                    {/* Redirect to Login */}
                    <div className="text-center mt-4">
                        <span className="text-gray-600">Already have an account? </span>
                        <a href="/user/login" className="text-sm text-indigo-600 hover:text-indigo-800">Log in</a>
                    </div>
                </Form>
            </motion.div>
        </div>
    );
};

export default SignUp;
