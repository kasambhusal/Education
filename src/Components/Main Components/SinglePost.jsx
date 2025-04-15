"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CloseOutlined } from "@ant-design/icons"
import { Helmet } from "react-helmet-async"
import Post from "../Child Components/Secondary Page Components/Post"
import { useUser } from "../Context/UserContext"
import { Get } from "../../utils/API"
import PleaseLogin from "../Child Components/Others/PleaseLogin"

const SinglePost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { token } = useUser()

    // Force meta refresh on component mount
    useEffect(() => {
        // This helps ensure meta tags are refreshed
        document.title = "EduSphere: Loading..."

        // Clean up function to reset title when component unmounts
        return () => {
            document.title = "EduSphere: The Ultimate Learning Platform"
        }
    }, [])

    useEffect(() => {
        window.scrollTo({ top: 100, behavior: "smooth" })
    }, [])

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await Get({
                    url: `/clubs/get/id/${id}`,
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                })
                const data = await response?.data
                setPost(data)
                setLoading(false)

                // Directly set the title as soon as we have data
                // This can help with some browsers/crawlers
                if (data?.title) {
                    document.title = `EduSphere: ${data.title}`
                }
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchPost()
    }, [id, token])

    const handleCancel = () => {
        navigate("/menu/clubs")
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    // Create a truncated description for meta tags
    const getMetaDescription = () => {
        if (!post?.text) return "Join EduSphere to explore educational content and connect with learners."
        return post.text.length > 160 ? `${post.text.substring(0, 157)}...` : post.text
    }

    // Get the current URL for canonical link
    const getCanonicalUrl = () => {
        return `${window.location.origin}/post/${id}`
    }

    // Generate a unique key for this render to force meta tag updates
    const metaKey = post ? `post-${post._id}-${Date.now()}` : `loading-${Date.now()}`

    if (!token) {
        return (
            <>
                <Helmet key={`login-${Date.now()}`}>
                    <title>EduSphere: Login Required</title>
                    <meta name="description" content="Please login to view this content on EduSphere." />
                    <meta property="og:title" content="EduSphere: Login Required" data-react-helmet="true" />
                    <meta
                        property="og:description"
                        content="Please login to view this content on EduSphere."
                        data-react-helmet="true"
                    />
                    <meta property="og:type" content="website" data-react-helmet="true" />
                    <meta name="twitter:title" content="EduSphere: Login Required" data-react-helmet="true" />
                    <meta
                        name="twitter:description"
                        content="Please login to view this content on EduSphere."
                        data-react-helmet="true"
                    />
                </Helmet>
                <PleaseLogin />
            </>
        )
    }

    if (loading) {
        return (
            <>
                <Helmet key={`loading-${Date.now()}`}>
                    <title>EduSphere: Loading...</title>
                    <meta name="description" content="Loading content on EduSphere." data-react-helmet="true" />
                    <meta property="og:title" content="EduSphere: Loading..." data-react-helmet="true" />
                    <meta property="og:description" content="Loading content on EduSphere." data-react-helmet="true" />
                    <meta property="og:type" content="website" data-react-helmet="true" />
                    <meta name="twitter:title" content="EduSphere: Loading..." data-react-helmet="true" />
                    <meta name="twitter:description" content="Loading content on EduSphere." data-react-helmet="true" />
                </Helmet>
                <motion.div
                    className="flex justify-center items-center min-h-screen bg-gray-100"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
                        <div className="animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-64 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    </div>
                </motion.div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Helmet key={`error-${Date.now()}`}>
                    <title>EduSphere: Error</title>
                    <meta
                        name="description"
                        content="An error occurred while loading content on EduSphere."
                        data-react-helmet="true"
                    />
                    <meta property="og:title" content="EduSphere: Error" data-react-helmet="true" />
                    <meta
                        property="og:description"
                        content="An error occurred while loading content on EduSphere."
                        data-react-helmet="true"
                    />
                    <meta property="og:type" content="website" data-react-helmet="true" />
                    <meta name="twitter:title" content="EduSphere: Error" data-react-helmet="true" />
                    <meta
                        name="twitter:description"
                        content="An error occurred while loading content on EduSphere."
                        data-react-helmet="true"
                    />
                </Helmet>
                <motion.div
                    className="flex justify-center items-center min-h-screen bg-gray-100"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
                        <p className="text-red-500">Error: {error}</p>
                        <button
                            onClick={handleCancel}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Back to Clubs
                        </button>
                    </div>
                </motion.div>
            </>
        )
    }

    return (
        <>
            {/* Dynamic SEO tags with unique key and data-react-helmet attribute */}
            <Helmet key={metaKey} prioritizeSeoTags encodeSpecialCharacters={true}>
                <title>EduSphere: {post?.title || "Post"}</title>
                <meta name="description" content={getMetaDescription()} data-react-helmet="true" />
                <meta
                    name="keywords"
                    content={`edusphere, education, ${post?.category || "learning"}, ${post?.title?.split(" ").join(", ") || ""}`}
                    data-react-helmet="true"
                />
                <link rel="canonical" href={getCanonicalUrl()} data-react-helmet="true" />

                {/* Open Graph tags for social media - with data-react-helmet attribute */}
                <meta property="og:title" content={`EduSphere: ${post?.title || "Post"}`} data-react-helmet="true" />
                <meta property="og:description" content={getMetaDescription()} data-react-helmet="true" />
                <meta property="og:image" content={post?.image || ""} data-react-helmet="true" />
                <meta property="og:url" content={getCanonicalUrl()} data-react-helmet="true" />
                <meta property="og:type" content="article" data-react-helmet="true" />
                <meta property="og:site_name" content="EduSphere" data-react-helmet="true" />

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
                <meta name="twitter:title" content={`EduSphere: ${post?.title || "Post"}`} data-react-helmet="true" />
                <meta name="twitter:description" content={getMetaDescription()} data-react-helmet="true" />
                <meta name="twitter:image" content={post?.image || ""} data-react-helmet="true" />

                {/* Article specific metadata */}
                {post?.from && (
                    <>
                        <meta property="article:author" content={post.from.name} data-react-helmet="true" />
                        <meta property="article:published_time" content={post.createdAt} data-react-helmet="true" />
                        {post.updatedAt !== post.createdAt && (
                            <meta property="article:modified_time" content={post.updatedAt} data-react-helmet="true" />
                        )}
                        <meta property="article:section" content={post.category} data-react-helmet="true" />
                    </>
                )}

                {/* Script to force meta refresh - this is a bit of a hack but can help */}
                <script type="application/javascript">
                    {`
            (function() {
              // Force browser to recognize meta changes
              document.title = "EduSphere: ${post?.title?.replace(/"/g, '\\"') || "Post"}";
            })();
          `}
                </script>
            </Helmet>

            <motion.div
                className="flex justify-center items-start min-h-screen bg-gray-100 pt-8"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="w-full max-w-3xl relative ">
                    <motion.button
                        onClick={handleCancel}
                        className="absolute right-0 w-9 h-9 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <CloseOutlined className="text-gray-600" />
                    </motion.button>
                    {post && <Post post={post} />}
                </div>
            </motion.div>
        </>
    )
}

export default SinglePost
