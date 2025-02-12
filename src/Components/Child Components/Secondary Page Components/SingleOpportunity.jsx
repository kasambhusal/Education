'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import PostTime from "../Secondary Page Components/PostTime";
import UserAvatar from "../Secondary Page Components/UserAvatar";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useUser } from "../../Context/UserContext";
import ModifyOpportunity from './ModifyOpportunity';
import { Modal, Button } from 'antd';
import { Delete } from '../../../utils/API';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};

export default function SingleOpportunity({ opportunity, onDelete, onUpdate, fetchOpportunities }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { user, token } = useUser();

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
            onDelete(opportunity.id);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting opportunity:", error);
        }
    };
    return (
        <>
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 relative overflow-hidden group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <UserAvatar user={opportunity.from} />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{opportunity.title}</h3>
                            <div className="mt-1">
                                <PostTime date={opportunity.createdAt} />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
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
                <p className="mt-4 text-gray-700 xl:w-[80%] text-justify">{opportunity.text}</p>

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
                                    onClick={() => setIsEditModalOpen(true)}
                                >
                                    <FiEdit2 />
                                </motion.button>
                                <motion.button
                                    variants={buttonVariants}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                                    onClick={() => setIsDeleteModalOpen(true)}
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
    );
}
