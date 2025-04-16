"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const Loader = ({
    isLoading = true,
    text = "Loading",
    color = "#4338ca",
    size = "default",
    fullScreen = false
}) => {
    const canvasRef = useRef(null)

    // Size mapping
    const sizeMap = {
        small: { container: "w-16 h-16", text: "text-xs" },
        default: { container: "w-24 h-24", text: "text-sm" },
        large: { container: "w-32 h-32", text: "text-base" }
    }

    const selectedSize = sizeMap[size] || sizeMap.default

    // Canvas animation
    useEffect(() => {
        if (!isLoading) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1

        // Set canvas size with device pixel ratio for sharp rendering
        const updateCanvasSize = () => {
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
        }

        updateCanvasSize()
        window.addEventListener('resize', updateCanvasSize)

        // Particles configuration
        const particles = []
        const particleCount = 12
        const maxSize = 6
        const maxSpeed = 0.5
        const colorVariants = [color, "#6366f1", "#818cf8"]

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2
            const distance = 30 + Math.random() * 10

            particles.push({
                x: canvas.width / (2 * dpr) + Math.cos(angle) * distance,
                y: canvas.height / (2 * dpr) + Math.sin(angle) * distance,
                size: 1 + Math.random() * maxSize,
                speedX: Math.cos(angle) * (0.2 + Math.random() * maxSpeed),
                speedY: Math.sin(angle) * (0.2 + Math.random() * maxSpeed),
                angle,
                color: colorVariants[Math.floor(Math.random() * colorVariants.length)],
                opacity: 0.6 + Math.random() * 0.4
            })
        }

        // Animation loop
        let animationId
        let lastTime = 0

        const animate = (timestamp) => {
            if (!lastTime) lastTime = timestamp
            const deltaTime = timestamp - lastTime
            lastTime = timestamp

            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

            // Update and draw particles
            particles.forEach(particle => {
                // Orbital motion
                particle.angle += 0.02
                particle.x = canvas.width / (2 * dpr) + Math.cos(particle.angle) * (30 + Math.sin(timestamp * 0.001) * 10)
                particle.y = canvas.height / (2 * dpr) + Math.sin(particle.angle) * (30 + Math.sin(timestamp * 0.001) * 10)

                // Draw particle
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = particle.color
                ctx.globalAlpha = particle.opacity
                ctx.fill()
            })

            // Draw connecting lines
            ctx.globalAlpha = 0.2
            ctx.strokeStyle = color
            ctx.lineWidth = 1

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 50) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', updateCanvasSize)
        }
    }, [isLoading, color])

    if (!isLoading) return null

    const containerClasses = fullScreen
        ? "fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50"
        : "flex flex-col items-center justify-center"

    return (
        <div className={containerClasses}>
            <div className={`relative ${selectedSize.container}`}>
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                />
                <motion.div
                    className="absolute inset-0 rounded-full border-t-2 border-indigo-600"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute inset-2 rounded-full border-t-2 border-indigo-400"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
            <motion.div
                className={`mt-4 font-medium text-indigo-800 ${selectedSize.text}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {text}
            </motion.div>
        </div>
    )
}

export default Loader
