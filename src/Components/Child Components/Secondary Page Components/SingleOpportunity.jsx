"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PostTime from "../Secondary Page Components/PostTime"
import UserAvatar from "../Secondary Page Components/UserAvatar"
import { FiEdit2, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { useUser } from "../../Context/UserContext"
import ModifyOpportunity from "./ModifyOpportunity"
import { Modal, Button } from "antd"
import { Delete } from "../../../utils/API"


const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
}

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
}

import "../../../CSS/rich-text-styles2.css"

export default function SingleOpportunity({ opportunity, onDelete, onUpdate, fetchOpportunities }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const { user, token } = useUser()
    const [expanded, setExpanded] = useState(false)
    const [showExpandButton, setShowExpandButton] = useState(false)
    const contentRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Check if content is long enough to need expansion
    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight
            const lineHeight = Number.parseInt(window.getComputedStyle(contentRef.current).lineHeight)
            const approxLines = contentHeight / (lineHeight || 24) // fallback to 24px if lineHeight is 'normal'

            // Show expand button if content is more than 5 lines
            setShowExpandButton(approxLines > 5)

            // On large screens, auto-expand if not too long
            if (!isMobile && approxLines <= 10) {
                setExpanded(true)
            } else {
                setExpanded(false)
            }
        }
    }, [opportunity.text, isMobile])

    const handleDelete = async () => {
        try {
            await Delete({
                url: `/opportunities/delete/${opportunity._id}`,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            })
            fetchOpportunities()
            onDelete && onDelete(opportunity.id)
            setIsDeleteModalOpen(false)
        } catch (error) {
            console.error("Error deleting opportunity:", error)
        }
    }

    const toggleExpand = (e) => {
        e.stopPropagation()
        setExpanded(!expanded)
    }

    return (
        <>
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 relative overflow-hidden group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Header section - responsive layout */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center space-x-4">
                        <UserAvatar user={opportunity.from} />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                {opportunity.title}
                            </h3>
                            <div className="mt-1">
                                <PostTime date={opportunity.createdAt} />
                            </div>
                        </div>
                    </div>

                    {/* Status badges - stack on mobile, row on desktop */}
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 font-medium">
                            {opportunity.type}
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${opportunity.status === "Open"
                                ? "bg-green-100 text-green-800"
                                : opportunity.status === "Closed"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                        >
                            {opportunity.status}
                        </span>
                    </div>
                </div>

                {/* LinkedIn-style content with show more/less */}
                <div className="mt-4 relative">
                    <div
                        ref={contentRef}
                        className={`text-gray-700 text-justify rich-text-content overflow-hidden transition-all duration-300 ${!expanded ? "max-h-[120px]" : "max-h-[2000px]"
                            }`}
                        dangerouslySetInnerHTML={{ __html: opportunity.text }}
                    />

                    {/* Gradient fade effect when collapsed */}
                    {!expanded && showExpandButton && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    )}

                    {/* Show more/less button */}
                    {showExpandButton && (
                        <button
                            onClick={toggleExpand}
                            className="mt-2 text-[#2C3E50] hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                        >
                            {expanded ? (
                                <>
                                    Show less <FiChevronUp className="inline" />
                                </>
                            ) : (
                                <>
                                    Show more <FiChevronDown className="inline" />
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Admin actions */}
                {user.role === "ADMIN" && (
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="absolute top-2 right-2 flex space-x-2"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <motion.button
                                    variants={buttonVariants}
                                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsEditModalOpen(true)
                                    }}
                                >
                                    <FiEdit2 />
                                </motion.button>
                                <motion.button
                                    variants={buttonVariants}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsDeleteModalOpen(true)
                                    }}
                                >
                                    <FiTrash2 />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </motion.div>

            <ModifyOpportunity
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                opportunity={opportunity}
                fetchOpportunities={fetchOpportunities}
            />

            <Modal
                title="Confirm Deletion"
                open={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="delete" type="primary" danger onClick={handleDelete}>
                        Delete
                    </Button>,
                ]}
            >
                <p>Are you sure you want to delete this opportunity?</p>
            </Modal>
        </>
    )
}
