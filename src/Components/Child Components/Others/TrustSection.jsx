"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle, Award, Users, Briefcase } from "lucide-react"

const trustItems = [
  {
    icon: CheckCircle,
    title: "Verified Opportunities",
    description: "All listings are thoroughly vetted for authenticity and value.",
  },
  {
    icon: Award,
    title: "Expert-Curated Content",
    description: "Study materials and guides created by field specialists.",
  },
  {
    icon: Users,
    title: "Thriving Community",
    description: "Connect with peers and mentors for support and collaboration.",
  },
  {
    icon: Briefcase,
    title: "Career Advancement",
    description: "Opportunities that boost your academic and professional profile.",
  },
]

export default function TrustSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-800"
          >
            Why Choose Us
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center h-full transform transition-all duration-300"
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  background: "linear-gradient(to bottom right, white, #f9fafb)",
                }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.8, ease: "easeInOut" },
                  }}
                >
                  <item.icon size={32} />
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>

                <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>

                <motion.div
                  className="w-12 h-1 bg-indigo-500 rounded-full mt-4 opacity-0"
                  animate={{ opacity: 1, width: [0, 48] }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
