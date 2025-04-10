import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { motion } from "framer-motion";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import { useUser } from "../Context/UserContext";
import { Post } from "../../utils/API"; // Your custom API.js file
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useUser();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (typeof parsedUser === "string") {
          form.setFieldsValue({ email: parsedUser });
        } else if (parsedUser && typeof parsedUser.email === "string") {
          form.setFieldsValue({ email: parsedUser.email });
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, [form]);

  const onFinish = async (values) => {
    try {
      const response = await Post({
        url: "/users/login",
        data: {
          email: values.email,
          password: values.password,
        },
      });

      localStorage.setItem("user", JSON.stringify(values.email));

      // Update context with user data and token
      login(response.user, response.token);

      notification.success({
        message: "Success",
        description: "Login successful.",
        duration: 3,
      });

      // Redirect to the previous page if available, otherwise go to "/"
      const redirectTo = location?.state?.redirectTo || "/";
      navigate(redirectTo, { replace: true });

    } catch (error) {
      console.error("Login failed", error?.response?.data);

      const errorMessage = error?.response?.data?.error || "An unexpected error occurred. Please try again.";

      notification.error({
        message: "Login Error",
        description: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
        duration: 3,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Form
          form={form}
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          >
            <Link to="/" className='w-full flex justify-center '>
              <img src="/logo.png" alt="Logo" className="max-w-[80%] max-h-[100px]" style={{ borderRadius: "10px", boxShadow: "0px 0px 16px black inset" }} />
            </Link>
          </motion.div>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input prefix={<UserIcon className="h-5 w-5 text-gray-400" />} placeholder="Email" className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
              placeholder="Password"
              className="rounded-md"
            />
          </Form.Item>
          <div className="text-center mt-4 flex justify-center gap-1">
            <p className="text-gray-600">Don&apos;t have an account? </p>
            <Link to="/user/sign-up" className="text-sm text-indigo-600 hover:text-indigo-800">
              Sign Up
            </Link>
          </div>
          <div className="flex justify-center mb-3">
            <Link to="/user/password-forgot" className="text-indigo-600">
              Forgot password?
            </Link>
          </div>
          <Form.Item>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                LogIn
              </Button>
            </motion.div>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  );
}
