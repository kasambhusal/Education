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

  // Clean up meta tags on component mount and unmount
  useEffect(() => {
    // Clean up function to remove duplicate meta tags
    const cleanupMetaTags = () => {
      // Get all meta tags
      const metaTags = document.querySelectorAll("meta")

      // Create a map to track seen tags by their name/property
      const seenTags = new Map()

      // Identify duplicates
      metaTags.forEach((tag) => {
        const name = tag.getAttribute("name")
        const property = tag.getAttribute("property")
        const key = name || property

        if (!key) return // Skip tags without name or property

        if (!seenTags.has(key)) {
          seenTags.set(key, tag)
        } else {
          // If this is a tag added by react-helmet, keep it and remove the other one
          if (tag.getAttribute("data-rh") === "true") {
            const previousTag = seenTags.get(key)
            if (previousTag && !previousTag.getAttribute("data-rh")) {
              previousTag.remove()
            }
            seenTags.set(key, tag)
          }
        }
      })
    }

    // Initial cleanup
    cleanupMetaTags()

    // Cleanup on unmount
    return () => {
      // Reset title
      document.title = "EduSphere: The Ultimate Learning Platform"

      // Remove any meta tags added by this component
      document.querySelectorAll('meta[data-rh="true"]').forEach((tag) => {
        tag.remove()
      })
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

  // Create a single Helmet component with all meta tags
  const renderHelmet = () => {
    if (!token) {
      return (
        <Helmet>
          <title>EduSphere: Login Required</title>
          <meta name="description" content="Please login to view this content on EduSphere." />
          <meta property="og:title" content="EduSphere: Login Required" />
          <meta property="og:description" content="Please login to view this content on EduSphere." />
          <meta property="og:type" content="website" />
          <meta name="twitter:title" content="EduSphere: Login Required" />
          <meta name="twitter:description" content="Please login to view this content on EduSphere." />
        </Helmet>
      )
    }

    if (loading) {
      return (
        <Helmet>
          <title>EduSphere: Loading...</title>
          <meta name="description" content="Loading content on EduSphere." />
          <meta property="og:title" content="EduSphere: Loading..." />
          <meta property="og:description" content="Loading content on EduSphere." />
          <meta property="og:type" content="website" />
          <meta name="twitter:title" content="EduSphere: Loading..." />
          <meta name="twitter:description" content="Loading content on EduSphere." />
        </Helmet>
      )
    }

    if (error) {
      return (
        <Helmet>
          <title>EduSphere: Error</title>
          <meta name="description" content="An error occurred while loading content on EduSphere." />
          <meta property="og:title" content="EduSphere: Error" />
          <meta property="og:description" content="An error occurred while loading content on EduSphere." />
          <meta property="og:type" content="website" />
          <meta name="twitter:title" content="EduSphere: Error" />
          <meta name="twitter:description" content="An error occurred while loading content on EduSphere." />
        </Helmet>
      )
    }

    if (post) {
      return (
        <Helmet>
          <title>EduSphere: {post.title || "Post"}</title>
          <meta name="description" content={getMetaDescription()} />
          <meta
            name="keywords"
            content={`edusphere, education, ${post.category || "learning"}, ${post.title?.split(" ").join(", ") || ""}`}
          />
          <link rel="canonical" href={getCanonicalUrl()} />

          {/* Open Graph tags for social media */}
          <meta property="og:title" content={`EduSphere: ${post.title || "Post"}`} />
          <meta property="og:description" content={getMetaDescription()} />
          <meta property="og:image" content={post.image || ""} />
          <meta property="og:url" content={getCanonicalUrl()} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="EduSphere" />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`EduSphere: ${post.title || "Post"}`} />
          <meta name="twitter:description" content={getMetaDescription()} />
          <meta name="twitter:image" content={post.image || ""} />

          {/* Article specific metadata */}
          {post.from && (
            <>
              <meta property="article:author" content={post.from.name} />
              <meta property="article:published_time" content={post.createdAt} />
              {post.updatedAt !== post.createdAt && <meta property="article:modified_time" content={post.updatedAt} />}
              <meta property="article:section" content={post.category} />
            </>
          )}
        </Helmet>
      )
    }

    return null
  }

  // Render the component with a single Helmet instance
  return (
    <>
      {renderHelmet()}

      {!token ? (
        <PleaseLogin />
      ) : loading ? (
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
      ) : error ? (
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
      ) : (
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
      )}
    </>
  )
}

export default SinglePost
