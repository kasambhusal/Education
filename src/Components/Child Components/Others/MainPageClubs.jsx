import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeartIcon, ShareIcon, ChatBubbleOvalLeftIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { clubData } from "../../JS/dummyData"

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

const UserAvatar = ({ user }) => {
    const [showInfo, setShowInfo] = useState(false)

    return (
        <motion.div className="relative">
            <motion.img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowInfo(true)}
            />
            <AnimatePresence>
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute z-10 bg-white p-4 rounded-lg shadow-lg  top-12"
                    >
                        <img src={user.image || "/placeholder.svg"} alt={user.name} className="w-20 h-20 rounded-full mb-2" />
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowInfo(false)}
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const SharePopup = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
                >
                    Post shared successfully!
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const Post = ({ post: initialPost }) => {
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [post, setPost] = useState(initialPost)
    const [isLiked, setIsLiked] = useState(false)
    const [showSharePopup, setShowSharePopup] = useState(false)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setPost((prev) => ({
            ...prev,
            likes: prev.likes + (isLiked ? -1 : 1),
        }))
    }

    const handleComment = (e) => {
        e.preventDefault()
        if (newComment.trim()) {
            console.log("New comment:", {
                postId: post.id,
                comment: newComment,
            })
            setNewComment("")
        }
    }

    const handleShare = () => {
        setShowSharePopup(true)
        setTimeout(() => setShowSharePopup(false), 2000)
        console.log("Sharing post:", post.id)
    }

    return (
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-start space-x-4">
                <UserAvatar user={post.from} />
                <div className="flex-grow">
                    <h3 className="font-semibold text-xl mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Posted by {post.from.name} on {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    {post.image && (
                        <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post content"
                            className="max-w-full max-h-[400px] object-cover rounded-lg mb-4"
                        />
                    )}
                    <p className="text-gray-800 mb-4">{post.text}</p>
                    <div className="flex items-center space-x-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                            onClick={handleLike}
                        >
                            {isLiked ? <HeartIconSolid className="w-6 h-6" /> : <HeartIcon className="w-6 h-6" />}
                            <span>{post.likes}</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                            onClick={() => setShowComments(!showComments)}
                        >
                            <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                            <span>{post.comments.length}</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                            onClick={handleShare}
                        >
                            <ShareIcon className="w-6 h-6" />
                            <span>Share</span>
                        </motion.button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showComments && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pl-6 border-l-2 border-gray-200"
                    >
                        {post.comments.map((comment) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mb-4"
                            >
                                <div className="flex items-start space-x-3">
                                    <UserAvatar user={comment.user} />
                                    <div>
                                        <p className="font-semibold">{comment.user.name}</p>
                                        <p className="text-gray-700">{comment.text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        <form onSubmit={handleComment} className="mt-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Comment
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            <SharePopup isOpen={showSharePopup} onClose={() => setShowSharePopup(false)} />
        </motion.div>
    )
}

const NewPostForm = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ title, content })
        setTitle("")
        setContent("")
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="bg-white rounded-xl p-6 w-full max-w-md"
                    >
                        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Post title"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            />
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="What's on your mind?"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                rows="4"
                            />
                            <div className="flex justify-end space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                                    onClick={onClose}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Post
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function MainPageClubs({ name }) {
    const [isNewPostOpen, setIsNewPostOpen] = useState(false)
    const selectedPosts = clubData[name] || []

    const handleNewPost = (postData) => {
        console.log("New post submitted:", postData)
    }

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-bold text-gray-800">{name} Discussions</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setIsNewPostOpen(true)}
                >
                    + New Post
                </motion.button>
            </div>

            <div className="flex-grow overflow-y-auto pr-4 -mr-4">
                {selectedPosts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>

            <NewPostForm isOpen={isNewPostOpen} onClose={() => setIsNewPostOpen(false)} onSubmit={handleNewPost} />
        </motion.div>
    )
}

