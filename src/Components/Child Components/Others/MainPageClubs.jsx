"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import NewPostForm from "../Secondary Page Components/NewPostForm"
import Post from "../Secondary Page Components/Post"
import { Get } from "../../../utils/API"
import { useUser } from "../../Context/UserContext"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export default function MainPageClubs({ name }) {
    const [isNewPostOpen, setIsNewPostOpen] = useState(false)
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const limit = 10
    const { token } = useUser()
    const observer = useRef()
    const initialLoadDone = useRef(false)

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const lastPostElementRef = useCallback(
        (node) => {
            if (isLoading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadPosts()
                }
            })
            if (node) observer.current.observe(node)
        },
        [isLoading, hasMore],
    )

    const loadPosts = useCallback(
        async (refresh = false) => {
            if (isLoading || (!hasMore && !refresh) || !name) return

            setIsLoading(true)
            try {
                const pageToFetch = refresh ? 1 : currentPage
                const response = await Get({
                    url: `/clubs/get/${name.toLowerCase()}?page=${pageToFetch}&limit=${limit}`,
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                })

                if (!response) {
                    setHasMore(false)
                    return
                }

                const { data: newPosts, hasMore: moreAvailable } = response

                setPosts((prevPosts) => {
                    if (refresh) return newPosts
                    const postIds = new Set(prevPosts.map((post) => post._id))
                    const filteredPosts = newPosts.filter((post) => !postIds.has(post._id))
                    return [...prevPosts, ...filteredPosts]
                })

                setHasMore(moreAvailable)
                setCurrentPage((prevPage) => (refresh ? 2 : prevPage + 1))
            } catch (error) {
                console.error("Error fetching posts:", error)
            } finally {
                setIsLoading(false)
            }
        },
        [name, currentPage, token, hasMore, isLoading],
    )

    useEffect(() => {
        if (name && !initialLoadDone.current) {
            loadPosts()
            initialLoadDone.current = true
        }
    }, [name, loadPosts])

    const handleNewPost = () => {
        setCurrentPage(1)
        setHasMore(true)
        loadPosts(true)
    }

    if (!name) {
        return <div>Loading...</div>
    }

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="h-full flex flex-col">
            <div
                className={`flex ${isMobile ? "flex-col" : "justify-between"} items-${isMobile ? "start" : "center"} mb-2 ${isMobile ? "gap-2 ml-3" : ""}`}
            >
                <h2 className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-gray-800  `}>{name} Discussions</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={` px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isMobile ? "text-sm" : ""}`}
                    onClick={() => setIsNewPostOpen(true)}
                >
                    + New Post
                </motion.button>
            </div>

            <div className="flex-grow overflow-y-auto sm:pr-4 -mr-4">
                {posts.map((post, index) => (
                    <div key={post._id} ref={index === posts.length - 1 ? lastPostElementRef : null}>
                        <Post post={post} />
                    </div>
                ))}
                {isLoading && <p className="text-center text-gray-500 my-4">Loading more posts...</p>}
                {!isLoading && !hasMore && <p className="text-center text-gray-500 my-4">No more posts in this club.</p>}
            </div>

            <NewPostForm
                isOpen={isNewPostOpen}
                onClose={() => setIsNewPostOpen(false)}
                category={name}
                onPostCreated={handleNewPost}
            />
        </motion.div>
    )
}
