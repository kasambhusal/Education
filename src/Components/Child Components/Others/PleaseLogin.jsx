"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"
import { Button, Typography, Space, Divider } from "antd"
import { LoginOutlined, LockOutlined, RocketOutlined } from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.2,
            duration: 0.6,
        },
    },
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
}

// Floating animation for decorative elements
const floatAnimation = {
    initial: { y: 0 },
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
        },
    },
}

export default function PleaseLogin() {
    const navigate = useNavigate()
    const location = useLocation()

    // Particle effect setup
    useEffect(() => {
        const canvas = document.getElementById("particles")
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles = []
        const particleCount = 50

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: `rgba(66, 139, 202, ${Math.random() * 0.5 + 0.1})`,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
            })
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fillStyle = particle.color
                ctx.fill()

                particle.x += particle.speedX
                particle.y += particle.speedY

                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
            })

            requestAnimationFrame(drawParticles)
        }

        drawParticles()

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleLogin = () => {
        navigate("/user/login", { state: { redirectTo: location.pathname } })
    }

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
            {/* Background particles */}
            <canvas id="particles" className="absolute inset-0 z-0"></canvas>

            {/* Decorative elements */}
            <motion.div
                className="absolute top-20 left-20 text-5xl text-blue-200 opacity-70 z-10"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
            >
                <RocketOutlined />
            </motion.div>

            <motion.div
                className="absolute bottom-20 right-20 text-5xl text-indigo-200 opacity-70 z-10"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                transition={{ delay: 1 }}
            >
                <LockOutlined />
            </motion.div>

            {/* Main content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-2xl rounded-2xl p-10 max-w-md w-full mx-4"
                style={{
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(66, 139, 202, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
            >
                <motion.div variants={itemVariants} className="mb-2">
                    <div className="flex justify-center mb-6">
                        <motion.div
                            className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <LockOutlined />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Title level={2} className="text-center mb-2">
                        Access Restricted
                    </Title>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Divider className="my-4">
                        <Text type="secondary">Edusphere Clubs</Text>
                    </Divider>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Paragraph className="text-gray-600 text-center mb-8">
                        Please log in to your Edusphere account to access the Clubs section and explore all available activities.
                    </Paragraph>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center">
                    <Space direction="vertical" size="large" className="w-full">
                        <Button
                            type="primary"
                            size="large"
                            icon={<LoginOutlined />}
                            onClick={handleLogin}
                            block
                            className="h-12 rounded-lg"
                            style={{
                                background: "linear-gradient(90deg, #1890ff 0%, #4c6ef5 100%)",
                                border: "none",
                            }}
                        >
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                                Go to Login
                            </motion.span>
                        </Button>

                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                                className="text-center"
                            >
                                <Text type="secondary" className="text-sm">
                                    Need help? Contact{" "}
                                    <a href="mailto:edusphere.learn@gmail.com" className="text-blue-500 hover:underline">
                                        edusphere.learn@gmail.com
                                    </a>
                                </Text>
                            </motion.div>
                        </AnimatePresence>
                    </Space>
                </motion.div>
            </motion.div>
        </div>
    )
}
