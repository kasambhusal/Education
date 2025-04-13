"use client"

import { useEffect, useState } from "react"
import { Button, Form, Input, Checkbox, notification } from "antd"
import { motion } from "framer-motion"
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid"
import { useUser } from "../Context/UserContext"
import { Post } from "../../utils/API" // Your custom API.js file
import { Link, useLocation, useNavigate } from "react-router-dom"

// Simple XOR cipher for basic obfuscation
const encrypt = (text) => {
  const key = "edusphereSecretKey" // You should use a more secure key in production
  return text
    .split("")
    .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length)))
    .join("")
}

const decrypt = (text) => {
  // XOR is symmetric, so we can use the same function for decryption
  return encrypt(text)
}

export default function Login() {
  const { login } = useUser()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  // Check for remembered credentials on component mount
  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser")
    if (rememberedUser) {
      try {
        const { email, encryptedPassword, remember } = JSON.parse(rememberedUser)
        if (email && encryptedPassword) {
          const password = decrypt(encryptedPassword)
          form.setFieldsValue({
            email,
            password,
            remember: remember || true,
          })
        }
      } catch (error) {
        console.error("Error parsing remembered user:", error)
      }
    }
  }, [form])

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await Post({
        url: "/users/login",
        data: {
          email: values.email,
          password: values.password,
        },
      })

      // Handle "remember me" functionality
      if (values.remember) {
        const encryptedPassword = encrypt(values.password)
        localStorage.setItem(
          "rememberedUser",
          JSON.stringify({
            email: values.email,
            encryptedPassword,
            remember: true,
          }),
        )
      } else {
        localStorage.removeItem("rememberedUser")
      }

      // Update context with user data and token
      login(response.user, response.token)

      notification.success({
        message: "Welcome back!",
        description: "Login successful. Redirecting you now...",
        duration: 3,
      })

      // Redirect to the previous page if available, otherwise go to "/"
      const redirectTo = location?.state?.redirectTo || "/"
      navigate(redirectTo, { replace: true })
    } catch (error) {
      console.error("Login failed", error?.response?.data)

      const errorMessage = error?.response?.data?.error || "An unexpected error occurred. Please try again."

      notification.error({
        message: "Login Error",
        description: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
        duration: 3,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600">
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
            className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 backdrop-blur-sm bg-white/90 relative z-10"
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            initialValues={{ remember: true }}
          >
            <motion.div
              className="text-center mb-8"
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
                transition={{ delay: 0.4 }}
              >
                Welcome Back
              </motion.h2>
              <motion.p
                className="text-gray-600 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Sign in to continue to EduSphere
              </motion.p>
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
              <Input
                prefix={<UserIcon className="h-5 w-5 text-gray-400" />}
                placeholder="Email"
                className="rounded-md py-2"
                size="large"
              />
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
                className="rounded-md py-2"
                size="large"
              />
            </Form.Item>

            <div className="flex justify-between items-center mb-4">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link
                to="/user/password-forgot"
                className="text-indigo-600 text-sm hover:text-indigo-800 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-6 text-center h-auto flex items-center justify-center"
                  size="large"
                  loading={loading}
                  disabled={loading}
                >
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    Sign In
                  </motion.span>
                </Button>
              </motion.div>
            </Form.Item>

            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex justify-center items-center gap-1">
                <p className="text-gray-600">Don't have an account?</p>
                <Link
                  to="/user/sign-up"
                  className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </motion.div>
          </Form>
        </div>
      </motion.div>
    </div>
  )
}
