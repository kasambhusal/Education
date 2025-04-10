"use client"

import { useState, useEffect, useRef } from "react"
import {
    HeartIcon,
    ShareIcon,
    ChatBubbleOvalLeftIcon,
    PaperAirplaneIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"
import UserAvatar from "./UserAvatar"
import { useUser } from "../../Context/UserContext"
import { Post as PostRequest } from "../../../utils/API"
import PostTime from "./PostTime"
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
    const [showOptions, setShowOptions] = useState(false)
    const commentInputRef = useRef(null)
    const commentSectionRef = useRef(null)
    const optionsRef = useRef(null)
    const textToCopy = `https://www.edusphere.pro/menu/clubs/post/${post?._id}`

    useEffect(() => {
        if (isLikeAnimating) {
            const timer = setTimeout(() => setIsLikeAnimating(false), 1000)
            return () => clearTimeout(timer)
        }
    }, [isLikeAnimating])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

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
                setPost({ ...post, likes: updatedPost.likes })
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
                setPost({ ...post, comments: updatedPost.comments }) // Ensure the UI is updated with the correct data
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

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return {
            date: date.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
            }),
            time: date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }),
            fullDate: date.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }),
        }
    }

    const formattedDate = formatDate(post.createdAt)

    return (
        <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4"
        >
            {/* Post Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <UserAvatar user={post.from} className="w-12 h-12" />
                        <div>
                            <div className="flex items-center">
                                <h3 className="font-semibold text-gray-900">{post.from.name}</h3>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-gray-500 text-sm" title={formattedDate.fullDate}>
                                    {formattedDate.date} at {formattedDate.time}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm">{post.from.email}</p>
                        </div>
                    </div>
                    <div className="relative" ref={optionsRef}>
                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500" />
                        </button>
                        {showOptions && (
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                <div className="py-1">
                                    <button
                                        onClick={handleCopy}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Copy link to post
                                    </button>
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Save post
                                    </button>
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Report post
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div className="px-4 sm:px-5 pt-3">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <div className="text-gray-800 mb-3 text-base leading-relaxed">
                    {isTextExpanded || post.text.length <= 300 ? (
                        <p className="whitespace-pre-line">{post.text}</p>
                    ) : (
                        <>
                            <p className="whitespace-pre-line">{post.text.slice(0, 300)}...</p>
                            <button
                                className="text-blue-600 hover:text-blue-800 font-medium mt-1"
                                onClick={() => setIsTextExpanded(true)}
                            >
                                See more
                            </button>
                        </>
                    )}
                    {isTextExpanded && post.text.length > 300 && (
                        <button
                            className="text-blue-600 hover:text-blue-800 font-medium mt-1 block"
                            onClick={() => setIsTextExpanded(false)}
                        >
                            See less
                        </button>
                    )}
                </div>
            </div>

            {/* Post Media */}
            {post.image && (
                <div className="mt-2 mb-3">
                    {post.image.endsWith(".mp4") || post.image.endsWith(".webm") || post.image.endsWith(".ogg") ? (
                        <video
                            src={post.image}
                            controls
                            className="w-full max-h-[500px] object-contain bg-black"
                            preload="metadata"
                        />
                    ) : (
                        <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post content"
                            className="w-full max-h-[500px] object-contain"
                            loading="lazy"
                        />
                    )}
                </div>
            )}

            {/* Engagement Stats */}
            <div className="px-4 sm:px-5 py-2 flex justify-between items-center text-sm text-gray-500 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                    {likeCount > 0 && (
                        <>
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full">
                                <HeartIconSolid className="w-3 h-3 text-blue-600" />
                            </span>
                            <span>{formatNumber(likeCount)}</span>
                        </>
                    )}
                </div>
                <div className="flex space-x-4">
                    {post.comments.length > 0 && (
                        <button onClick={toggleComments} className="hover:underline">
                            {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
                        </button>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-2 sm:px-3 py-2 flex justify-between border-t border-gray-200">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-colors ${isLiked ? "text-blue-600" : "text-gray-600 hover:bg-gray-50"
                        }`}
                    onClick={handleLike}
                >
                    <motion.div animate={isLikeAnimating ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
                        {isLiked ? <HeartIconSolid className="w-5 h-5 text-blue-600" /> : <HeartIcon className="w-5 h-5" />}
                    </motion.div>
                    <span className="font-medium text-sm">Like</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={toggleComments}
                >
                    <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                    <span className="font-medium text-sm">Comment</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={handleCopy}
                >
                    <ShareIcon className="w-5 h-5" />
                    <span className="font-medium text-sm">Share</span>
                </motion.button>
            </div>

            {/* Comments Section */}
            <AnimatePresence>
                {showComments && (
                    <motion.div
                        ref={commentSectionRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 bg-gray-50"
                    >
                        {/* Comment Form */}
                        <form onSubmit={handleComment} className="p-4">
                            <div className="flex items-start space-x-2">
                                <UserAvatar user={user} className="w-8 h-8 mt-1" />
                                <div className="flex-grow relative">
                                    <input
                                        ref={commentInputRef}
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="w-full px-4 py-2 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={!newComment.trim()}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-blue-600 rounded-full hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <PaperAirplaneIcon className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                        </form>

                        {/* Comments List */}
                        {post.comments.length > 0 ? (
                            <div className="px-4 pb-4 space-y-3">
                                {[...post.comments]
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .slice(0, visibleComments)
                                    .map((comment) => (
                                        <motion.div
                                            key={comment._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex space-x-2"
                                        >
                                            <UserAvatar user={comment.from} className="w-8 h-8 mt-1" />
                                            <div className="flex-grow">
                                                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
                                                    <p className="font-medium text-sm text-gray-900">{comment.from.name}</p>
                                                    <p className="text-gray-800 text-sm break-words">{comment.text}</p>
                                                </div>
                                                <div className="flex items-center mt-1 ml-2 text-xs text-gray-500 space-x-3">
                                                    <PostTime date={comment.createdAt} />
                                                    <button className="hover:text-gray-700">Like</button>
                                                    <button className="hover:text-gray-700">Reply</button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                {visibleComments < post.comments.length && (
                                    <div className="text-center mt-2">
                                        <button
                                            onClick={handleLoadMoreComments}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                                        >
                                            View more comments ({post.comments.length - visibleComments} remaining)
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">No comments yet. Be the first to comment!</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notification Popups */}
            <AnimatePresence>
                {showSharePopup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Link copied to clipboard
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCommentPopup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Comment added successfully
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Post
