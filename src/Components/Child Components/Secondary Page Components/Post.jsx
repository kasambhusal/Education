"use client"

import { useState, useEffect, useRef } from "react"
import { HeartIcon, ShareIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"
import UserAvatar from "./UserAvatar"
import { useUser } from "../../Context/UserContext"
import { Post as PostRequest } from "../../../utils/API"
import PostTime from "./PostTime"
import { Statistic } from "antd"
import { formatNumber } from "../../JS/formatNumber"

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
}

const Post = ({ post: initialPost }) => {
    const { user, token } = useUser()
    const [post, setPost] = useState(initialPost)
    const [isLiked, setIsLiked] = useState(post.likes.includes(user._id))
    const [likeCount, setLikeCount] = useState(post.likes.length)
    const [isLikeAnimating, setIsLikeAnimating] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [showSharePopup, setShowSharePopup] = useState(false)
    const [showCommentPopup, setShowCommentPopup] = useState(false)
    const [isTextExpanded, setIsTextExpanded] = useState(false)
    const [visibleComments, setVisibleComments] = useState(10)
    const commentInputRef = useRef(null)
    const commentSectionRef = useRef(null)
    const textToCopy = `http://localhost:5173/menu/clubs/post/${post?._id}`
    useEffect(() => {
        if (isLikeAnimating) {
            const timer = setTimeout(() => setIsLikeAnimating(false), 1000)
            return () => clearTimeout(timer)
        }
    }, [isLikeAnimating])
    const handleLike = async () => {
        const userId = user._id
        const postId = post._id
        const newIsLiked = !isLiked

        // Optimistic update
        setIsLiked(newIsLiked)
        setLikeCount((prevCount) => (newIsLiked ? prevCount + 1 : prevCount - 1))
        setIsLikeAnimating(true)

        try {
            const response = await PostRequest({
                url: newIsLiked ? "/clubs/post/like" : "/clubs/post/unlike",
                data: { user_id: userId, club_id: postId },
                headers: { Authorization: token },
            })
            if (response.ok) {
                const { updatedPost } = await response.json()
                setPost(...updatedPost.likes)
                setIsLiked(updatedPost.likes.includes(user._id))
                setLikeCount(updatedPost.likes.length)
            }
        } catch (error) {
            console.error("Error updating like status:", error)
            // Revert optimistic update on error
            setIsLiked(!newIsLiked)
            setLikeCount((prevCount) => (!newIsLiked ? prevCount + 1 : prevCount - 1))
        }
    }

    const handleComment = async (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        // Optimistic update: Add new comment locally with the user's image
        const tempComment = {
            _id: Date.now().toString(), // Temporary ID
            from: {
                name: user.name,
                _id: user._id,
                email: user.email,
                image: user.image || "https://i.pravatar.cc/150?img=1", // Ensure image is included
            },
            text: newComment,
            createdAt: new Date().toISOString(),
        }

        setPost((prevPost) => ({
            ...prevPost,
            comments: [tempComment, ...prevPost.comments],
        }))
        setNewComment("")
        setShowCommentPopup(true)
        setTimeout(() => setShowCommentPopup(false), 2000)

        try {
            const response = await PostRequest({
                url: "/clubs/post/comment",
                data: {
                    club_id: post._id,
                    user_email: user.email,
                    text: newComment,
                },
                headers: { Authorization: token },
            })

            if (response.ok) {
                const { updatedPost } = await response.json()
                setPost(...updatedPost.comments) // Ensure the UI is updated with the correct data
            }
        } catch (error) {
            console.error("Error posting comment:", error)
        }
    }

    const handleLoadMoreComments = () => {
        setVisibleComments(visibleComments + 10)
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy)
            setShowSharePopup(true)
            setTimeout(() => setShowSharePopup(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    const toggleComments = () => {
        setShowComments(!showComments)
        if (!showComments) {
            setTimeout(() => {
                commentInputRef.current?.focus()
                commentSectionRef.current?.scrollIntoView({ behavior: "smooth" })
            }, 100)
        }
    }

    return (
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-start space-x-4">
                <UserAvatar user={post.from} />
                <div className="flex-grow">
                    <h3 className="font-semibold text-xl mb-2 line-clamp-1">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Posted by {post.from.name}{" "}
                        <span
                            className="relative group cursor-default"
                            title={new Date(post.createdAt).toLocaleString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        >
                            on{" "}
                            {new Date(post.createdAt).toLocaleString("en-US", {
                                month: "long",
                                day: "numeric",
                            })}{" "}
                            at{" "}
                            {new Date(post.createdAt).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: false,
                            })}

                        </span>
                    </p>
                    {post.image &&
                        (post.image.endsWith(".mp4") || post.image.endsWith(".webm") || post.image.endsWith(".ogg") ? (
                            <video src={post.image} controls className="max-w-full max-h-[400px] object-cover rounded-lg mb-4" />
                        ) : (
                            <img
                                src={post.image || "/placeholder.svg"}
                                alt="Post content"
                                className="max-w-full max-h-[400px] object-cover rounded-lg mb-4"
                            />
                        ))}

                    <p className="text-gray-800 mb-4 text-justify">
                        {isTextExpanded || post.text.length <= 300 ? post.text : `${post.text.slice(0, 300)}...`}
                        {post.text.length > 300 && !isTextExpanded && (
                            <button className="text-blue-500 text-sm ml-2" onClick={() => setIsTextExpanded(true)}>
                                See More
                            </button>
                        )}
                        {isTextExpanded && post.text.length > 300 && (
                            <button className="text-blue-500 text-sm ml-2" onClick={() => setIsTextExpanded(false)}>
                                See Less
                            </button>
                        )}
                    </p>

                    {/* Like, Comment, and Share Buttons */}
                    <div className="flex items-center space-x-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                            onClick={handleLike}
                        >
                            <motion.div animate={isLikeAnimating ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
                                {isLiked ? <HeartIconSolid className="w-6 h-6" /> : <HeartIcon className="w-6 h-6" />}
                            </motion.div>
                            <motion.span
                                key={likeCount}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Statistic
                                    value={formatNumber(likeCount)}
                                    valueStyle={{
                                        color: "#6B7280",
                                        fontSize: "16px",
                                    }}
                                />
                            </motion.span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                            onClick={toggleComments}
                        >
                            <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                            <span>{post.comments.length}</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                            onClick={handleCopy}
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
                        ref={commentSectionRef}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 border-t border-gray-200 pt-4"
                    >
                        <form onSubmit={handleComment} className="mb-4">
                            <div className="flex items-center space-x-2">
                                <UserAvatar user={user} className="w-8 h-8" />
                                <input
                                    ref={commentInputRef}
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                                >
                                    <PaperAirplaneIcon className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                            className="space-y-4"
                        >
                            {[...post.comments]
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .slice(0, visibleComments)
                                .map((comment) => (
                                    <motion.div
                                        key={comment._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex space-x-3"
                                    >
                                        <UserAvatar user={comment.from} className="w-8 h-8" />
                                        <div className="flex-grow bg-gray-100 rounded-lg p-3">
                                            <p className="font-semibold text-sm">{comment.from.name}</p>
                                            <p className="text-gray-700 text-sm">{comment.text}</p>
                                            <PostTime date={comment.createdAt} />
                                        </div>
                                    </motion.div>
                                ))}
                        </motion.div>

                        {visibleComments < post.comments.length && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLoadMoreComments}
                                className="mt-4 text-blue-500 hover:underline"
                            >
                                Load More Comments
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSharePopup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
                    >
                        URL Copied to Clipboard!
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCommentPopup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
                    >
                        Comment added successfully!
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Post

